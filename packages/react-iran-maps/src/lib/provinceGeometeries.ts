import { useMemo } from "react";
import * as topojson from "topojson-client";
import iranData from "../assets/counties.json";
import { CountyFeature } from "../types/CountyFeature";
import { ProvinceFeature } from "../types/ProvinceFeature";
import { useAllCounties } from "./allCounties";

// Create province geometries by merging counties using topojson.merge

export function useGenerateProvinceGeometries() {
  const allCounties = useAllCounties();
  const provinceGeometries = useMemo(() => {
    if (allCounties.length === 0) return [];

    const provinceGroups: Record<string, CountyFeature[]> = {};

    // Group counties by province
    allCounties.forEach((county) => {
      // Support both field names: provincName (Shahrestan1400) and NAME_1 (iran-counties)
      const provinceName =
        county.properties.provincName || county.properties.NAME_1 || "";
      if (!provinceGroups[provinceName]) {
        provinceGroups[provinceName] = [];
      }
      provinceGroups[provinceName].push(county);
    });

    // Create province features by merging county geometries
    const provinces: ProvinceFeature[] = Object.entries(provinceGroups)
      .map(([provinceName, counties]) => {
        if (counties.length === 0) return null;

        const firstCounty = counties[0];

        // Get the TopoJSON geometries for this province's counties
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const provinceCountyGeometries = (iranData as any).objects[
          "Shahrestan1400"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ].geometries.filter((geom: any) => {
          const geomProvinceName =
            geom.properties.provincName || geom.properties.NAME_1;
          return geomProvinceName === provinceName;
        });

        // Merge all county geometries into a single province geometry
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mergedGeometry = topojson.merge(
          iranData as any,
          provinceCountyGeometries
        );

        return {
          type: "Feature",
          properties: {
            NAME_1: firstCounty?.properties.NAME_1,
            provincName: firstCounty?.properties.provincName,
            countyCount: counties.length,
          },
          geometry: mergedGeometry,
        } as ProvinceFeature;
      })
      .filter(Boolean) as ProvinceFeature[];

    return provinces;
  }, [allCounties]);

  return provinceGeometries;
}
