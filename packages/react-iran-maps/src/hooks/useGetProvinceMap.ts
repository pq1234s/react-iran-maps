import { useMemo } from "react";
import { CountyMapItem, ProvinceData, ProvinceMapItem } from "../types";

export function useGetProvinceMap(data?: ProvinceData[]) {
  return useMemo(() => {
    if (!data) {
      return {};
    }

    console.log("data", data);

    const provinceMap: Record<string, ProvinceMapItem> = {};

    if (data) {
      data.forEach((province) => {
        provinceMap[province.name] = {
          count: province.count,
          name: province.name,
          counties: province.counties
            ? province.counties.reduce((countyMap: CountyMapItem, county) => {
                countyMap[county.name] = county;
                return countyMap;
              }, {})
            : undefined,
        };
      });
    }

    return provinceMap;
  }, [data]);
}
