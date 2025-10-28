/**
 * Data for a single county/city within a province.
 * @example { name: "تهران", value: 8500000 }
 */
export interface CountyData {
  /** County name in Persian (e.g., "تهران", "کرج") */
  name: string;
  /** Value - number for quantitative data, string for categorical (e.g., "high") */
  value?: string | number;
}

/**
 * Map of county data indexed by county name. Used internally by the library.
 */
export type CountyMapItem = Record<string, CountyData>;
