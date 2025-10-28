import { CountyData } from "./CountyData";

/**
 * Data for a province and its counties. This is the main type for ChoroplethMap data.
 * @example
 * const data: ProvinceData = {
 *   name: "تهران",
 *   value: 15000000,
 *   counties: [
 *     { name: "تهران", value: 8500000 },
 *     { name: "کرج", value: 2000000 }
 *   ]
 * };
 */
export interface ProvinceData {
  /** Province name in Persian (e.g., "تهران", "اصفهان") */
  name: string;
  /** Value - number for quantitative, string for categorical */
  value?: string | number;
  /** Array of counties for drilldown functionality */
  counties?: CountyData[];
}

/**
 * Internal representation of province data. Used by the library internally.
 * Counties are stored as Record instead of array.
 */
export interface ProvinceMapItem {
  name: string;
  value?: string | number;
  counties?: Record<string, CountyData>;
}
