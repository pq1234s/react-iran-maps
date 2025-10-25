import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { geoBounds } from "d3-geo";
import { scaleQuantize } from "d3-scale";

import { useAllCounties } from "../lib/allCounties";
import { useGenerateProvinceGeometries } from "../lib/provinceGeometeries";
import { MapProps, ProvinceMapItem } from "../types";
import { useGetProvinceMap } from "../hooks";
import { getProvinceName } from "../lib";
import { Tooltip } from "./Tooltip";
import { Legend } from "./Legend";
import { animate } from "motion";

const DEFAULT_COLOR_RANGE = [
  "#AADBDD",
  "#75C4C8",
  "#37AAAF",
  "#199DA3",
  "#16898E",
];

export function Map({
  isolateProvince = true,
  data,
  showOnlyWithData = false,
  colorScale = DEFAULT_COLOR_RANGE,
  renderTooltipContent,
  width = 800,
  height = 600,
  aspectRatio = "1.23",
}: MapProps) {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [displayedProvince, setDisplayedProvince] = useState<string | null>(
    null
  );

  const [zoom, setZoom] = useState(1);
  const defaultScale = Math.min(width, height) * 3.4;
  const [scale, setScale] = useState(defaultScale);
  const defaultCenter = [53.5, 32.5] as [number, number];
  const [center, setCenter] = useState<[number, number]>(defaultCenter);
  const [minRange, setMinRange] = useState<number>(0);
  const [maxRange, setMaxRange] = useState<number>(0);

  const provinceMap = useGetProvinceMap(data);
  const [tooltipContent, setTooltipContent] = useState<string | undefined>(
    undefined
  );

  const legendScale = scaleQuantize<string>()
    .domain([minRange, maxRange])
    .range(colorScale);

  const getColor = useCallback(
    (count?: number) => {
      if (!count || count === 0) {
        return "#fff";
      }

      return scaleQuantize<string>()
        .domain([minRange, maxRange])
        .range(colorScale)(count);
    },
    [minRange, maxRange, colorScale]
  );

  useEffect(() => {
    const dataMap:
      | Record<string, ProvinceMapItem>
      | ProvinceMapItem
      | undefined = selectedProvince
      ? provinceMap[selectedProvince]?.counties
      : provinceMap;

    const values: number[] = Object.values(dataMap || {}).map(
      (province) => province.count
    );
    const min = Math.min(...values);
    const max = Math.max(...values);
    setMinRange(min);
    setMaxRange(max);
  }, [selectedProvince]);

  const allCounties = useAllCounties();
  const provinceGeometries = useGenerateProvinceGeometries();

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
          optimalCenter: defaultCenter,
          optimalScale: defaultScale,
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
      const calculatedScale =
        defaultScale * 1.1 * Math.min(zoomFactor * 0.7, 4.5);

      return {
        optimalCenter: [centerLon, centerLat] as [number, number],
        optimalScale: calculatedScale,
      };
    }

    // Default for provinces view
    return {
      optimalCenter: defaultCenter,
      optimalScale: defaultScale,
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
  const scaleRef = useRef(scale);
  const centerRef = useRef(center);

  useEffect(() => {
    // Animate Scale
    animate(scaleRef.current, optimalScale, {
      duration: 0.6,
      onUpdate: (latest) => {
        scaleRef.current = latest;
        setScale(latest);
      },
    });

    // Animate Longitude
    animate(centerRef.current[0], optimalCenter[0], {
      duration: 0.6,
      onUpdate: (latest) => {
        centerRef.current = [latest, centerRef.current[1]];
        setCenter([latest, centerRef.current[1]]);
      },
    });

    // Animate Latitude
    animate(centerRef.current[1], optimalCenter[1], {
      duration: 0.6,
      onUpdate: (latest) => {
        centerRef.current = [centerRef.current[0], latest];
        setCenter([centerRef.current[0], latest]);
      },
    });
  }, [optimalScale, optimalCenter]);

  // Calculate final scale based on animated scale and user zoom
  const finalScale = useMemo(() => {
    return scale * zoom;
  }, [scale, zoom]);

  const handleChangeProvince = (geo: any) => {
    setSelectedProvince(geo.properties.provincName || geo.properties.NAME_1);
  };

  // Handle back button
  const handleBack = () => {
    setSelectedProvince(null);
  };

  return (
    <>
      <Tooltip />
      <div style={{ position: "absolute", top: 0, left: 0 }}>
        <span onClick={handleBack}>ایران</span>
        {selectedProvince && <span>/{selectedProvince}</span>}
      </div>

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
                const provinceName = getProvinceName(
                  geo,
                  data?.[0]?.name.match(/\w+/g) ? "en" : "fa"
                );
                let currentItem: ProvinceMapItem | undefined;
                if (provinceName) {
                  currentItem =
                    selectedProvince && geo.properties.cityName
                      ? provinceMap[selectedProvince]?.counties?.[
                          geo.properties.cityName
                        ]
                      : provinceMap[provinceName];
                }

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      setTooltipContent(
                        renderTooltipContent
                          ? renderTooltipContent(currentItem, geo)
                          : `<div>
                              <div>${selectedProvince ? geo.properties.cityName : geo.properties.provincName}</div>
                              <div>${currentItem?.count || 0} :تعداد</div>
                            </div>`
                      );
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    onClick={() => handleChangeProvince(geo)}
                    fill={getColor(currentItem?.count)}
                    stroke="#093A3C"
                    strokeWidth={0.5}
                    style={{
                      default: {
                        outline: "none",
                      },
                      pressed: {
                        outline: "none",
                      },
                      hover: {
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
        <Legend colorScale={legendScale} />
      </div>
    </>
  );
}
