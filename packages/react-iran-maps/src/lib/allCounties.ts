import { useMemo } from "react";
import * as topojson from "topojson-client";
import iranData from "../assets/counties.json";
import { CountyFeature } from "../types/CountyFeature";

export function useAllCounties() {
  const allCounties = useMemo(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const counties = topojson.feature(iranData as any, (iranData as any).objects["Shahrestan1400"]) as any;
      return counties.features as CountyFeature[];
    } catch (error) {
      console.error("Error parsing TopoJSON:", error);
      return [];
    }
  }, []);

  return allCounties;
}
