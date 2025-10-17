export interface ProvinceFeature {
  type: "Feature";
  properties: {
    // Core fields
    provincName?: string; // Province name in Persian (e.g., "تهران")
    NAME_1?: string; // Province name in English (e.g., "Tehran")
    // Computed fields
    countyCount?: number; // Number of counties in this province
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  geometry: any;
}
