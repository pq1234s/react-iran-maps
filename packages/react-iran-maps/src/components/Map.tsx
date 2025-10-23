import React, { useState, useMemo, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { geoBounds } from "d3-geo";
import { scaleLinear } from "d3-scale";

import { useAllCounties } from "../lib/allCounties";
import { useGenerateProvinceGeometries } from "../lib/provinceGeometeries";
import { MapProps, ProvinceMapItem } from "../types";
import { useGetProvinceMap } from "../hooks";
import { getCountyName, getProvinceName } from "../lib";
import { Tooltip } from "./Tooltip";

export function Map({
  isolateProvince = true,
  data,
  showOnlyWithData = false,
  colorScale = ["#E0F2FE", "#0369A1"],
  renderTooltipContent,
  width = 800,
  height = 600,
  aspectRatio = "1.23",
}: MapProps) {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [displayedProvince, setDisplayedProvince] = useState<string | null>(
    null
  );
  const [hoveredGeography, setHoveredGeography] = useState<string | null>(null);
  const [hoveredCount, setHoveredCount] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const [scale, setScale] = useState(Math.min(width, height) * 3.4);
  const [center, setCenter] = useState<[number, number]>([53.5, 32.5]);

  console.log("this is data", data);
  const provinceMap = useGetProvinceMap(data);
  const [tooltipContent, setTooltipContent] = useState<string | undefined>(
    undefined
  );

  const allCounties = useAllCounties();
  const provinceGeometries = useGenerateProvinceGeometries();

  // Calculate color scales based on data
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { provinceColorScale, countyColorScale } = useMemo(() => {
    if (!data || data.length === 0) {
      return {
        provinceColorScale: null,
        countyColorScale: null,
      };
    }

    // Get min/max for provinces
    const provinceCounts: number[] = Object.values(provinceMap).map(
      (province) => province.count
    );
    const provinceMin = Math.min(...provinceCounts);
    const provinceMax = Math.max(...provinceCounts);
    const countyCounts: number[] = Object.values(provinceMap).flatMap(
      (province) =>
        Object.values(province.counties ?? {}).map((county) => county.count)
    );
    const countyMin = Math.min(...countyCounts);
    const countyMax = Math.max(...countyCounts);

    return {
      provinceColorScale: scaleLinear<string>()
        .domain([provinceMin, provinceMax])
        .range(colorScale),
      countyColorScale: scaleLinear<string>()
        .domain([countyMin, countyMax])
        .range(colorScale),
    };
  }, [data, provinceMap, colorScale]);

  // Current view data - uses displayedProvince to keep showing counties during zoom out
  const currentGeographies = useMemo(() => {
    let geographies;

    if (displayedProvince) {
      if (isolateProvince) {
        // Show only counties for selected province
        geographies = allCounties.filter((county) => {
          const countyProvinceName =
            county.properties.provincName || county.properties.NAME_1;
          return countyProvinceName === displayedProvince;
        });
      } else {
        // Show selected province counties + other provinces
        const selectedCounties = allCounties.filter((county) => {
          const countyProvinceName =
            county.properties.provincName || county.properties.NAME_1;
          return countyProvinceName === displayedProvince;
        });

        const otherProvinces = provinceGeometries.filter(
          (province) =>
            (province.properties.provincName || province.properties.NAME_1) !==
            displayedProvince
        );

        geographies = [...selectedCounties, ...otherProvinces];
      }
    } else {
      // Show provinces
      geographies = provinceGeometries;
    }

    // Filter by data if showOnlyWithData is true
    if (showOnlyWithData && data) {
      if (displayedProvince) {
        // Filter counties
        geographies = geographies.filter((geo) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const props = geo.properties as any;
          const isCounty = !!props.cityName || !!props.NAME_2;
          if (isCounty) {
            const countyName = props.cityName || props.NAME_2;
            const provinceName = props.provincName || props.NAME_1;
            return `${provinceName}:${countyName}` in provinceMap;
          }
          // Keep provinces in non-isolate mode
          return true;
        });
      } else {
        // Filter provinces
        geographies = geographies.filter((geo) => {
          const provinceName =
            geo.properties.provincName || geo.properties.NAME_1 || "";
          return provinceName in provinceMap;
        });
      }
    }

    return geographies;
  }, [
    displayedProvince,
    allCounties,
    provinceGeometries,
    isolateProvince,
    showOnlyWithData,
    data,
    provinceMap,
  ]);

  // Calculate optimal center and scale for current view
  const { optimalCenter, optimalScale } = useMemo(() => {
    if (selectedProvince) {
      // Calculate bounding box for selected province counties only
      const selectedCounties = allCounties.filter((county) => {
        const countyProvinceName =
          county.properties.provincName || county.properties.NAME_1;
        return countyProvinceName === selectedProvince;
      });

      if (selectedCounties.length === 0) {
        return {
          optimalCenter: [53.5, 32.5] as [number, number],
          optimalScale: 700,
        };
      }

      const bounds = geoBounds({
        type: "FeatureCollection",
        features: selectedCounties,
      });

      const [[minLon, minLat], [maxLon, maxLat]] = bounds;

      // Calculate center
      const centerLon = (minLon + maxLon) / 2;
      const centerLat = (minLat + maxLat) / 2;

      // Calculate dimensions of province
      const lonDelta = maxLon - minLon;
      const latDelta = maxLat - minLat;
      const maxDelta = Math.max(lonDelta, latDelta);

      // Iran's approximate extent: ~18 degrees longitude, ~15 degrees latitude
      // Province view should zoom in based on relative size
      // Smaller provinces get higher zoom, larger provinces get lower zoom
      const iranMaxDelta = 18; // approximate width of Iran in degrees
      const zoomFactor = iranMaxDelta / maxDelta;

      // Base scale for Iran is 700, multiply by zoom factor for province
      // Add a cap to prevent extreme zoom for very small provinces
      const calculatedScale = 700 * Math.min(zoomFactor * 0.7, 4.5);

      return {
        optimalCenter: [centerLon, centerLat] as [number, number],
        optimalScale: calculatedScale,
      };
    }

    // Default for provinces view
    return {
      optimalCenter: [53.5, 32.5] as [number, number],
      optimalScale: 700,
    };
  }, [selectedProvince, allCounties]);

  // Handle province selection changes with delayed geography update when going back
  useEffect(() => {
    setZoom(1); // Reset user zoom when view changes

    if (selectedProvince !== null) {
      // Drilling down: immediately update displayed province and start animation
      setDisplayedProvince(selectedProvince);
    } else {
      // Going back: keep showing counties, animate zoom out, then switch to provinces
      // After 600ms (animation duration), switch to showing provinces
      const timer = setTimeout(() => {
        setDisplayedProvince(null);
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [selectedProvince]);

  // Animate scale and center to optimal values
  useEffect(() => {
    const duration = 600; // Animation duration in ms
    const startTime = Date.now();
    const startScale = scale;
    const startCenter = center;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-in-out)
      const eased =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      // Interpolate scale
      const newScale = startScale + (optimalScale - startScale) * eased;
      // setScale(newScale);

      // Interpolate center
      const newCenter: [number, number] = [
        startCenter[0] + (optimalCenter[0] - startCenter[0]) * eased,
        startCenter[1] + (optimalCenter[1] - startCenter[1]) * eased,
      ];
      setCenter(newCenter);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // setScale(optimalScale);
        setCenter(optimalCenter);
      }
    };

    requestAnimationFrame(animate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProvince, optimalScale, optimalCenter]);

  // Calculate final scale based on animated scale and user zoom
  const finalScale = useMemo(() => {
    console.log("scale", scale);
    console.log("zoom", zoom);
    return scale * zoom;
  }, [scale, zoom]);

  // Zoom handlers
  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom * 1.5, 10)); // Max 10x zoom
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom / 1.5, 0.5)); // Min 0.5x zoom
  };

  const handleResetZoom = () => {
    setZoom(1);
    // Center will be at optimal/target position already
  };

  // Handle mouse wheel zoom
  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    const delta = event.deltaY * -0.001;
    const newZoom = Math.min(Math.max(zoom * (1 + delta), 0.5), 10);
    setZoom(newZoom);
  };

  // Handle geography click
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (geo: any) => {
    if (selectedProvince) {
      // If viewing counties, do nothing (could show county details)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const countyName = geo.properties.cityName || geo.properties.NAME_2;
    } else {
      // If viewing provinces, drill down to counties
      const provinceName = geo.properties.provincName || geo.properties.NAME_1;
      setSelectedProvince(provinceName);
      // Center and zoom will be handled by useEffect
    }
  };

  // Handle back button
  const handleBack = () => {
    setSelectedProvince(null);
    // Center and zoom will be handled by useEffect
  };

  console.log("tooltipContent", tooltipContent);

  return (
    <>
      <Tooltip />

      <div
        data-tooltip-id="tooltip"
        data-tooltip-html={tooltipContent ?? ""}
        style={{
          width: "100%",
          height: "100%",
          aspectRatio: aspectRatio,
        }}
      >
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            center,
            scale: finalScale,
          }}
          width={width}
          height={height}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <Geographies
            geography={{
              type: "FeatureCollection",
              features: currentGeographies,
            }}
          >
            {({ geographies }) =>
              geographies.map((geo) => {
                // Determine geography type
                const geoProvinceName = getProvinceName(geo);
                const isCounty = !!getCountyName(geo);
                const isSelectedProvinceCounty =
                  displayedProvince &&
                  isCounty &&
                  geoProvinceName === displayedProvince;
                const isOtherProvince =
                  displayedProvince &&
                  !isCounty &&
                  geoProvinceName !== displayedProvince;
                const isProvince = !displayedProvince;

                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const name = isCounty
                  ? geo.properties.cityName || geo.properties.NAME_2 // County name
                  : geo.properties.provincName || geo.properties.NAME_1; // Province name

                // Get data count and color for this geography
                // eslint-disable-next-line @typescript-eslint/no-unused-vars -- Placeholder for future data visualization
                const dataCount: number | null = null;
                const fillColor: string | null = null;

                // Default colors (used when no data or no color calculated)
                const defaultFill = isSelectedProvinceCounty
                  ? "#CBD5E1"
                  : isOtherProvince
                    ? "#F1F5F9"
                    : isProvince
                      ? "#E2E8F0"
                      : "#CBD5E1";

                const defaultHoverFill = isSelectedProvinceCounty
                  ? "#10B981"
                  : isOtherProvince
                    ? "#E2E8F0"
                    : "#3B82F6";

                const defaultPressedFill = isSelectedProvinceCounty
                  ? "#047857"
                  : isOtherProvince
                    ? "#CBD5E1"
                    : "#1E40AF";
                const provinceName = getProvinceName(
                  geo,
                  data?.[0]?.name.match(/\w+/g) ? "en" : "fa"
                );
                let provinceData: ProvinceMapItem | undefined;
                if (provinceName) {
                  provinceData = provinceMap[provinceName];
                }

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      setTooltipContent(
                        renderTooltipContent
                          ? renderTooltipContent(provinceData, geo)
                          : provinceData?.count
                            ? `<div>
                              <div>${geo.properties.provincName}</div>
                              <div>${provinceData?.count || 0} :تعداد</div>
                            </div>`
                            : `${geo.properties.provincName}`
                      );
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                      setHoveredGeography(null);
                      setHoveredCount(null);
                    }}
                    onClick={() => handleClick(geo)}
                    style={{
                      default: {
                        fill: fillColor || defaultFill,
                        stroke: "#FFF",
                        strokeWidth: isOtherProvince ? 1.5 : 1,
                        strokeLinejoin: "round",
                        strokeLinecap: "round",
                        outline: "none",
                        vectorEffect: "non-scaling-stroke",
                        opacity: isOtherProvince ? 0.6 : 1,
                      },
                      hover: {
                        fill: fillColor || defaultHoverFill,
                        stroke: "#FFF",
                        strokeWidth: isOtherProvince ? 1.5 : 1,
                        strokeLinejoin: "round",
                        strokeLinecap: "round",
                        cursor: "pointer",
                        outline: "none",
                        vectorEffect: "non-scaling-stroke",
                        opacity: isOtherProvince ? 0.7 : fillColor ? 0.8 : 1,
                        filter: fillColor ? "brightness(0.9)" : undefined,
                      },
                      pressed: {
                        fill: fillColor || defaultPressedFill,
                        stroke: "#FFF",
                        strokeWidth: isOtherProvince ? 1.5 : 1,
                        strokeLinejoin: "round",
                        strokeLinecap: "round",
                        outline: "none",
                        vectorEffect: "non-scaling-stroke",
                        opacity: isOtherProvince ? 0.7 : fillColor ? 0.7 : 1,
                        filter: fillColor ? "brightness(0.8)" : undefined,
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </div>
    </>
  );
}
