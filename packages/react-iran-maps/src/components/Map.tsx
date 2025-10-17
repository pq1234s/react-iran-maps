import React, { useState, useMemo } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

import { useAllCounties } from "../lib/allCounties";
import { useGenerateProvinceGeometries } from "../lib/provinceGeometeries";

export function Map() {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [hoveredGeography, setHoveredGeography] = useState<string | null>(null);
  const allCounties = useAllCounties();
  const provinceGeometries = useGenerateProvinceGeometries();
  // Extract all counties from TopoJSON

  // Current view data
  const currentGeographies = useMemo(() => {
    if (selectedProvince) {
      // Show counties for selected province
      return allCounties.filter((county) => {
        const countyProvinceName =
          county.properties.provincName || county.properties.NAME_1;
        return countyProvinceName === selectedProvince;
      });
    } else {
      // Show provinces
      return provinceGeometries;
    }
  }, [selectedProvince, allCounties, provinceGeometries]);

  // Handle geography click
  const handleClick = (geo: any) => {
    if (selectedProvince) {
      // If viewing counties, do nothing (could show county details)
      const countyName = geo.properties.cityName || geo.properties.NAME_2;
      console.log("County clicked:", countyName);
    } else {
      // If viewing provinces, drill down to counties
      const provinceName = geo.properties.provincName || geo.properties.NAME_1;
      setSelectedProvince(provinceName);
      console.log("Province selected:", provinceName);
    }
  };

  // Handle back button
  const handleBack = () => {
    setSelectedProvince(null);
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
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
          {selectedProvince ? `${selectedProvince} Counties` : "Iran Provinces"}
        </div>
        <div>
          <strong>Count:</strong> {currentGeographies.length}
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
          center: [53.5, 32.5],
          scale: selectedProvince ? 1200 : 700, // Zoom in when viewing counties
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
              const isProvince = !selectedProvince;
              const name = isProvince
                ? geo.properties.provincName || geo.properties.NAME_1 // Province name
                : geo.properties.cityName || geo.properties.NAME_2; // County name

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => setHoveredGeography(name)}
                  onMouseLeave={() => setHoveredGeography(null)}
                  onClick={() => handleClick(geo)}
                  style={{
                    default: {
                      fill: isProvince ? "#E2E8F0" : "#CBD5E1",
                      stroke: "#FFF",
                      strokeWidth: isProvince ? 1 : 0.5,
                      outline: "none",
                    },
                    hover: {
                      fill: isProvince ? "#3B82F6" : "#10B981",
                      stroke: "#FFF",
                      strokeWidth: isProvince ? 1 : 0.5,
                      cursor: "pointer",
                      outline: "none",
                    },
                    pressed: {
                      fill: isProvince ? "#1E40AF" : "#047857",
                      stroke: "#FFF",
                      strokeWidth: isProvince ? 1 : 0.5,
                      outline: "none",
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
