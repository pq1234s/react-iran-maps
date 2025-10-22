import { CountyFeature } from "./CountyFeature";
import { ProvinceData, ProvinceMapItem } from "./ProvinceData";

export interface MapProps {
  /**
   * When true (default), drilling down shows only the selected province's counties.
   * When false, drilling down zooms to the province but still shows all other provinces.
   */
  isolateProvince?: boolean;
  /**
   * Data to display on the map with counts for provinces and counties
   */
  data?: ProvinceData[];
  /**
   * When true, only shows provinces/counties that have data.
   * When false (default), shows all provinces/counties with data-based coloring.
   */
  showOnlyWithData?: boolean;
  /**
   * Custom color scale. Defaults to blue gradient.
   * Provide an array of colors [minColor, maxColor] for the gradient.
   */
  colorScale?: [string, string];

  renderTooltipContent?: (
    provinceData?: ProvinceMapItem,
    geo?: CountyFeature
  ) => string;
}
