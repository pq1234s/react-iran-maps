# ChoroplethMap Test Samples

This directory contains comprehensive test samples for the ChoroplethMap component, organized into two pages for better navigation.

## Structure

```
samples/
├── 01-EmptyMap.tsx                    # Basic samples (Page 1)
├── 02-QuantitativeDefault.tsx
├── 03-QuantitativeCustomColors.tsx
├── 04-QualitativeData.tsx
├── 05-DrilldownQuantitative.tsx
├── 06-DrilldownQualitative.tsx
├── 07-DisabledTooltip.tsx
├── 08-CustomTooltip.tsx               # Advanced samples (Page 2)
├── 09-DifferentSizes.tsx
├── 10-NoLegend.tsx
├── 11-CustomAspectRatio.tsx
├── 12-EnglishNames.tsx
├── 13-IncompleteData.tsx
├── 14-ZeroValues.tsx
├── index.ts                           # Exports all samples
└── README.md                          # This file
```

## Pages

### Page 1: Basic Samples (/)

- ✅ Empty Map
- ✅ Quantitative Default Colors
- ✅ Quantitative Custom Colors
- ✅ Qualitative Data
- ✅ Drilldown Quantitative
- ✅ Drilldown Qualitative
- ✅ Disabled Tooltip

### Page 2: Advanced Samples (/advanced)

- ✅ Custom Tooltip
- ✅ Different Sizes
- ✅ No Legend
- ✅ Custom Aspect Ratio
- ✅ English Names
- ✅ Incomplete Data
- ✅ Zero Values

## Test Scenarios Details

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

## Navigation

The app includes a navbar component that allows easy navigation between basic and advanced samples:

- **نمونه‌های پایه** (Basic Samples) - `/`
- **نمونه‌های پیشرفته** (Advanced Samples) - `/advanced`

## Usage

```tsx
// In page.tsx
import { EmptyMapSample, QuantitativeDefaultSample } from "./samples";
import { Navbar } from "./components/Navbar";

export default function Page() {
  return (
    <>
      <Navbar />
      <div>
        <EmptyMapSample />
        <QuantitativeDefaultSample />
        {/* ... other samples */}
      </div>
    </>
  );
}
```

## Adding New Samples

1. **Create new component** in `samples/` directory (e.g., `15-NewSample.tsx`)

   ```typescript
   "use client";

   import { ChoroplethMap, ProvinceData } from "react-iran-maps";

   export function NewSample() {
     return (
       <section className="bg-white rounded-lg shadow-lg p-6">
         <h2>Your Test Title</h2>
         <ChoroplethMap data={yourData} />
       </section>
     );
   }
   ```

2. **Export from index.ts**:

   ```typescript
   export { NewSample } from "./15-NewSample";
   ```

3. **Add to appropriate page** (`page.tsx` or `advanced/page.tsx`):
   ```typescript
   import { NewSample } from "../samples";
   // ... render it
   ```

## Important Notes

- All sample components use `"use client"` directive as they contain interactive React components
- The `ChoroplethMap` component uses React hooks and requires client-side rendering
- Each sample is isolated and can be tested independently
