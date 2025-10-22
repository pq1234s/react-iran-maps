import { CountyFeature } from "../types";

export function getProvinceName(
  geography: CountyFeature,
  language: "en" | "fa" = "fa"
): string | undefined {
  return language === "en"
    ? geography.properties.NAME_1
    : geography.properties.provincName;
}
