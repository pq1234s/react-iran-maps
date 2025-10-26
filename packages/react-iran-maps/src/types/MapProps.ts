import { CountyFeature } from "./CountyFeature";
import { ProvinceData, ProvinceMapItem } from "./ProvinceData";

interface LegendItem {
  label: string;
  value: string;
  color: string;
}

interface QuantitativeLegend {
  mode: "quantitative";
  colors: string[]; // ✅ required
  items?: never; // ❌ not allowed when quantitative
}

interface QualitativeLegend {
  mode: "qualitative";
  items: LegendItem[]; // ✅ required
  colors?: never; // ❌ not allowed when qualitative
}

type LegendConfig = QuantitativeLegend | QualitativeLegend;

export interface MapProps {
  /**
   * When true, the tooltip is disabled.
   */
  disableTooltip?: boolean;
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
  colorScale?: string[];

  /**
   * Width of the map.
   */
  width?: number;
  /**
   * Height of the map.
   */
  height?: number;

  /**
   * Aspect ratio of the map.
   */
  aspectRatio?: string;

  /**
   * Legend configuration.
   */
  legend?: LegendConfig;

  /**
   * Custom tooltip content.
   */
  renderTooltipContent?: (
    provinceData?: ProvinceMapItem,
    geo?: CountyFeature
  ) => string;
}
