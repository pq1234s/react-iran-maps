import { CountyFeature } from "./CountyFeature";
import { ProvinceData, ProvinceMapItem } from "./ProvinceData";

interface LegendItem {
  label: string;
  value: string;
  color: string;
}

interface QuantitativeLegend {
  disable?: boolean;
  mode: "quantitative";
  colors: string[]; // ✅ required
  items?: never; // ❌ not allowed when quantitative
}

interface QualitativeLegend {
  disable?: boolean;
  mode: "qualitative";
  items: LegendItem[]; // ✅ required
  colors?: never; // ❌ not allowed when qualitative
}

type LegendConfig = QuantitativeLegend | QualitativeLegend;

export interface ChoroplethMapProps {
  /**
   * When true, drilling down is enabled.
   */
  drilldown?: boolean;
  /**
   * When true, the tooltip is disabled.
   */
  disableTooltip?: boolean;
  /**
   * Data to display on the map with counts for provinces and counties
   */
  data?: ProvinceData[];

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
