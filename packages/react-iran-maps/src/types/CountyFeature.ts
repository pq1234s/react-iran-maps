/**
 * GeoJSON feature for a county/city. Used internally and passed to custom tooltip renderers.
 * @example Used in renderTooltipContent prop to access county properties
 */
export interface CountyFeature {
  type: "Feature";
  properties: {
    /** Province name in Persian (e.g., "تهران") */
    provincName?: string;
    /** County name in Persian (e.g., "شهریار") */
    cityName: string;
    /** Province name in English (e.g., "Tehran") */
    NAME_1: string;
    /** County name in English (optional) */
    NAME_2?: string;
    /** Geometric properties (optional) */
    area?: number;
    perimeter?: number;
    Shape_Leng?: number;
    Shape_Area?: number;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  geometry: any;
}
