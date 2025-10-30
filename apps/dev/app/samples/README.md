# ChoroplethMap Test Samples

This directory contains comprehensive test samples for the ChoroplethMap component.

## Structure

```
samples/
├── components/          # Individual sample components
│   ├── 01-EmptyMap.tsx
│   ├── 02-QuantitativeDefault.tsx
│   ├── 03-QuantitativeCustomColors.tsx
│   ├── 04-QualitativeData.tsx
│   ├── 05-DrilldownQuantitative.tsx
│   ├── 06-DrilldownQualitative.tsx
│   ├── 07-DisabledTooltip.tsx
│   ├── 08-CustomTooltip.tsx
│   ├── 09-DifferentSizes.tsx
│   ├── 10-NoLegend.tsx
│   ├── 11-CustomAspectRatio.tsx
│   ├── 12-EnglishNames.tsx
│   ├── 13-IncompleteData.tsx
│   └── 14-ZeroValues.tsx
├── index.ts             # Exports all samples
└── README.md            # This file
```

## Test Scenarios

### 1. Empty Map

Tests the map with no data - all provinces appear white.

### 2. Quantitative Default

Tests numeric data (population) with default color scheme.

### 3. Quantitative Custom Colors

Tests numeric data with custom yellow-orange color palette.

### 4. Qualitative Data

Tests categorical data (risk levels: بسیار بالا, بالا, متوسط, کم).

### 5. Drilldown Quantitative

Tests interactive drilldown with numeric county-level data.

### 6. Drilldown Qualitative

Tests interactive drilldown with categorical county-level data.

### 7. Disabled Tooltip

Tests map with tooltips disabled.

### 8. Custom Tooltip

Tests map with custom styled tooltip renderer.

### 9. Different Sizes

Tests small (400x300) and large (600x450) map dimensions.

### 10. No Legend

Tests map with legend disabled.

### 11. Custom Aspect Ratio

Tests map with wider aspect ratio (2:1).

### 12. English Names

Tests map with English province names.

### 13. Incomplete Data

Tests map with partial data coverage - some provinces have data, others don't.

### 14. Zero Values

Tests edge case handling of zero values.

## Usage

```tsx
import { EmptyMapSample, QuantitativeDefaultSample } from "./samples";

export default function Page() {
  return (
    <>
      <EmptyMapSample />
      <QuantitativeDefaultSample />
      {/* ... other samples */}
    </>
  );
}
```

## Adding New Samples

1. Create a new component file in `components/` directory (e.g., `15-NewSample.tsx`)
2. Export the component from `index.ts`
3. Import and use it in `page.tsx`
