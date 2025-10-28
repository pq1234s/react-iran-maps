/**
 * GeoJSON feature for a province. Used internally by the ChoroplethMap component.
 */
export interface ProvinceFeature {
  type: "Feature";
  properties: {
    /** Province name in Persian (e.g., "تهران") */
    provincName: string;
    /** Province name in English (e.g., "Tehran") */
    NAME_1?: string;
    /** Number of counties (optional) */
    countyCount?: number;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  geometry: any;
}
