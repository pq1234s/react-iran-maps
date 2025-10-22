import { CountyFeature } from "../types";

export function getCountyName(geography: CountyFeature): string | undefined {
  return geography.properties.cityName || geography.properties.NAME_2;
}
