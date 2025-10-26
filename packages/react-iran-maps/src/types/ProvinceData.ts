import { CountyData } from "./CountyData";

export interface ProvinceData {
  name: string;
  value?: string | number;
  counties?: CountyData[];
}

export interface ProvinceMapItem {
  name: string;
  value?: string | number;
  counties?: Record<string, CountyData>;
}
