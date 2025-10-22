import { CountyData } from "./CountyData";

export interface ProvinceData {
  name: string;
  count: number;
  counties?: CountyData[];
}

export interface ProvinceMapItem {
  name: string;
  count: number;
  counties?: Record<string, CountyData>;
}
