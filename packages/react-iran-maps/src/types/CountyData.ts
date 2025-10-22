export interface CountyData {
  name: string;
  count: number;
}

export type CountyMapItem = Record<string, CountyData>;
