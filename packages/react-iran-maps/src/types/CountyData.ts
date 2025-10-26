export interface CountyData {
  name: string;
  value?: string | number;
}

export type CountyMapItem = Record<string, CountyData>;
