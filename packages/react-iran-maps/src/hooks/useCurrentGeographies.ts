import { useMemo } from "react";
import { useAllCounties } from "./useAllCounties";
import { useGenerateProvinceGeometries } from "./useGenerateProvinceGeometries";

export function useCurrentGeographies(displayedProvince: string | null) {
  const allCounties = useAllCounties();
  const provinceGeometries = useGenerateProvinceGeometries();
  // Current view data - uses displayedProvince to keep showing counties during zoom out
  const currentGeographies = useMemo(() => {
    let geographies;

    if (displayedProvince) {
      // Show only counties for selected province
      geographies = allCounties.filter((county) => {
        const countyProvinceName =
          county.properties.provincName || county.properties.NAME_1;
        return countyProvinceName === displayedProvince;
      });
    } else {
      // Show provinces
      geographies = provinceGeometries;
    }

    return geographies;
  }, [displayedProvince, allCounties, provinceGeometries]);

  return currentGeographies;
}
