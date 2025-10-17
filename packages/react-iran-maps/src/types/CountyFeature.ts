export interface CountyFeature {
  type: "Feature";
  properties: {
    // Core fields (used in the app)
    provincName?: string; // Province name in Persian (e.g., "تهران")
    cityName?: string; // City/County name in Persian (e.g., "شهریار")
    NAME_1?: string; // Province name in English (e.g., "Tehran")
    NAME_2?: string; // City name in Latin script (transliterated)
    // Geometry fields
    area?: number;
    perimeter?: number;
    Shape_Leng?: number;
    Shape_Area?: number;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  geometry: any;
}
