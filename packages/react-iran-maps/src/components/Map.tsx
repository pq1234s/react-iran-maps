import React, { useState, useMemo, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { geoBounds } from "d3-geo";

import { useAllCounties } from "../lib/allCounties";
import { useGenerateProvinceGeometries } from "../lib/provinceGeometeries";

interface MapProps {
  /**
   * When true (default), drilling down shows only the selected province's counties.
   * When false, drilling down zooms to the province but still shows all other provinces.
   */
  isolateProvince?: boolean;
}

export function Map({ isolateProvince = true }: MapProps) {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [displayedProvince, setDisplayedProvince] = useState<string | null>(
    null
  );
  const [hoveredGeography, setHoveredGeography] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [animatedScale, setAnimatedScale] = useState(700);
  const [animatedCenter, setAnimatedCenter] = useState<[number, number]>([
    53.5, 32.5,
  ]);

  const allCounties = useAllCounties();
  const provinceGeometries = useGenerateProvinceGeometries();

  // Current view data - uses displayedProvince to keep showing counties during zoom out
  const currentGeographies = useMemo(() => {
    if (displayedProvince) {
      if (isolateProvince) {
        // Show only counties for selected province
        return allCounties.filter((county) => {
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

        return [...selectedCounties, ...otherProvinces];
      }
    } else {
      // Show provinces
      return provinceGeometries;
    }
  }, [displayedProvince, allCounties, provinceGeometries, isolateProvince]);

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
    const startScale = animatedScale;
    const startCenter = animatedCenter;

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
      setAnimatedScale(newScale);

      // Interpolate center
      const newCenter: [number, number] = [
        startCenter[0] + (optimalCenter[0] - startCenter[0]) * eased,
        startCenter[1] + (optimalCenter[1] - startCenter[1]) * eased,
      ];
      setAnimatedCenter(newCenter);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setAnimatedScale(optimalScale);
        setAnimatedCenter(optimalCenter);
      }
    };

    requestAnimationFrame(animate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProvince, optimalScale, optimalCenter]);

  // Calculate final scale based on animated scale and user zoom
  const scale = useMemo(() => {
    return animatedScale * zoom;
  }, [animatedScale, zoom]);

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
      const countyName = geo.properties.cityName || geo.properties.NAME_2;
      console.log("County clicked:", countyName);
    } else {
      // If viewing provinces, drill down to counties
      const provinceName = geo.properties.provincName || geo.properties.NAME_1;
      setSelectedProvince(provinceName);
      // Center and zoom will be handled by useEffect
      console.log("Province selected:", provinceName);
    }
  };

  // Handle back button
  const handleBack = () => {
    setSelectedProvince(null);
    // Center and zoom will be handled by useEffect
  };

  return (
    <div
      style={{ position: "relative", width: "100%", height: "100%" }}
      onWheel={handleWheel}
    >
      {/* Back button */}
      {selectedProvince && (
        <button
          onClick={handleBack}
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            zIndex: 1000,
            padding: "8px 16px",
            backgroundColor: "#333",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          ← Back to Provinces
        </button>
      )}

      {/* Zoom controls */}
      <div
        style={{
          position: "absolute",
          bottom: 10,
          left: 10,
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          gap: "5px",
        }}
      >
        <button
          onClick={handleZoomIn}
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "#333",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "20px",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          title="Zoom In"
        >
          +
        </button>
        <button
          onClick={handleZoomOut}
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "#333",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "20px",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          title="Zoom Out"
        >
          −
        </button>
        <button
          onClick={handleResetZoom}
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "#333",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          title="Reset Zoom"
        >
          ⟲
        </button>
      </div>

      {/* Info panel */}
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 1000,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "10px",
          borderRadius: "4px",
          fontSize: "12px",
          maxWidth: "200px",
          color: "black",
        }}
      >
        <div>
          <strong>View:</strong>{" "}
          {displayedProvince
            ? isolateProvince
              ? `${displayedProvince} Counties`
              : `${displayedProvince} (with context)`
            : "Iran Provinces"}
        </div>
        <div>
          <strong>
            {displayedProvince && !isolateProvince ? "Counties:" : "Count:"}
          </strong>{" "}
          {displayedProvince && !isolateProvince
            ? currentGeographies.filter((geo) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const props = geo.properties as any;
                return !!props.cityName || !!props.NAME_2;
              }).length
            : currentGeographies.length}
        </div>
        <div>
          <strong>Zoom:</strong> {zoom.toFixed(1)}x
        </div>
        <div>
          <strong>Scale:</strong> {scale.toFixed(0)}
        </div>
        {hoveredGeography && (
          <div>
            <strong>Hovered:</strong> {hoveredGeography}
          </div>
        )}
      </div>

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          center: animatedCenter,
          scale: scale,
        }}
        width={800}
        height={600}
        style={{
          width: "100%",
          height: "100%",
          border: "1px solid #ccc",
          borderRadius: "8px",
          overflow: "hidden",
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
              const geoProvinceName =
                geo.properties.provincName || geo.properties.NAME_1;
              const isCounty =
                !!geo.properties.cityName || !!geo.properties.NAME_2;
              const isSelectedProvinceCounty =
                displayedProvince &&
                isCounty &&
                geoProvinceName === displayedProvince;
              const isOtherProvince =
                displayedProvince &&
                !isCounty &&
                geoProvinceName !== displayedProvince;
              const isProvince = !displayedProvince;

              const name = isCounty
                ? geo.properties.cityName || geo.properties.NAME_2 // County name
                : geo.properties.provincName || geo.properties.NAME_1; // Province name

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => setHoveredGeography(name)}
                  onMouseLeave={() => setHoveredGeography(null)}
                  onClick={() => handleClick(geo)}
                  style={{
                    default: {
                      fill: isSelectedProvinceCounty
                        ? "#CBD5E1" // County color
                        : isOtherProvince
                          ? "#F1F5F9" // Lighter color for other provinces
                          : isProvince
                            ? "#E2E8F0" // Province color
                            : "#CBD5E1",
                      stroke: "#FFF",
                      strokeWidth: isOtherProvince ? 1.5 : 1,
                      strokeLinejoin: "round",
                      strokeLinecap: "round",
                      outline: "none",
                      vectorEffect: "non-scaling-stroke",
                      opacity: isOtherProvince ? 0.6 : 1,
                    },
                    hover: {
                      fill: isSelectedProvinceCounty
                        ? "#10B981"
                        : isOtherProvince
                          ? "#E2E8F0"
                          : "#3B82F6",
                      stroke: "#FFF",
                      strokeWidth: isOtherProvince ? 1.5 : 1,
                      strokeLinejoin: "round",
                      strokeLinecap: "round",
                      cursor: "pointer",
                      outline: "none",
                      vectorEffect: "non-scaling-stroke",
                      opacity: isOtherProvince ? 0.7 : 1,
                    },
                    pressed: {
                      fill: isSelectedProvinceCounty
                        ? "#047857"
                        : isOtherProvince
                          ? "#CBD5E1"
                          : "#1E40AF",
                      stroke: "#FFF",
                      strokeWidth: isOtherProvince ? 1.5 : 1,
                      strokeLinejoin: "round",
                      strokeLinecap: "round",
                      outline: "none",
                      vectorEffect: "non-scaling-stroke",
                      opacity: isOtherProvince ? 0.7 : 1,
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}
