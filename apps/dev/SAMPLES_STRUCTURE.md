# ChoroplethMap Test Samples - Project Structure

## 📁 Final Directory Structure

```
apps/dev/app/
├── page.tsx                    # Main page - imports and renders all samples
├── layout.tsx
├── globals.css
└── samples/                    # Test samples directory
    ├── README.md              # Documentation for samples
    ├── index.ts               # Barrel export file
    └── components/            # Individual sample components
        ├── 01-EmptyMap.tsx
        ├── 02-QuantitativeDefault.tsx
        ├── 03-QuantitativeCustomColors.tsx
        ├── 04-QualitativeData.tsx
        ├── 05-DrilldownQuantitative.tsx
        ├── 06-DrilldownQualitative.tsx
        ├── 07-DisabledTooltip.tsx
        ├── 08-CustomTooltip.tsx
        ├── 09-DifferentSizes.tsx
        ├── 10-NoLegend.tsx
        ├── 11-CustomAspectRatio.tsx
        ├── 12-EnglishNames.tsx
        ├── 13-IncompleteData.tsx
        └── 14-ZeroValues.tsx
```

## 🎯 Key Features

### Clean Architecture

- ✅ **Modular Components**: Each test scenario is in its own file
- ✅ **Barrel Exports**: `index.ts` provides clean imports
- ✅ **Organized Structure**: Components nested in `components/` folder
- ✅ **Easy Maintenance**: Add new samples by creating new files

### Import Pattern

**In `samples/index.ts`:**

```typescript
export { EmptyMapSample } from "./components/01-EmptyMap";
export { QuantitativeDefaultSample } from "./components/02-QuantitativeDefault";
// ... etc
```

**In `page.tsx`:**

```typescript
import {
  EmptyMapSample,
  QuantitativeDefaultSample,
  // ... all other samples
} from "./samples";

export default function Home() {
  return (
    <div>
      <EmptyMapSample />
      <QuantitativeDefaultSample />
      {/* ... render all samples */}
    </div>
  );
}
```

## 📋 All Test Scenarios

| #   | Sample Name              | Tests                                       |
| --- | ------------------------ | ------------------------------------------- |
| 1   | EmptyMap                 | No data - all provinces white               |
| 2   | QuantitativeDefault      | Numeric data with default colors            |
| 3   | QuantitativeCustomColors | Numeric data with custom palette            |
| 4   | QualitativeData          | Categorical/risk level data                 |
| 5   | DrilldownQuantitative    | Interactive drilldown with numeric data     |
| 6   | DrilldownQualitative     | Interactive drilldown with categorical data |
| 7   | DisabledTooltip          | Map without tooltips                        |
| 8   | CustomTooltip            | Custom styled tooltip                       |
| 9   | DifferentSizes           | Small & large map dimensions                |
| 10  | NoLegend                 | Map without legend                          |
| 11  | CustomAspectRatio        | Wide aspect ratio (2:1)                     |
| 12  | EnglishNames             | English province names                      |
| 13  | IncompleteData           | Partial data coverage                       |
| 14  | ZeroValues               | Zero value handling                         |

## 🚀 Running the Tests

```bash
cd apps/dev
npm run dev
```

Then visit: **http://localhost:3000**

## 📝 Adding New Test Samples

1. **Create new component** in `samples/components/`:

   ```typescript
   // samples/components/15-YourNewSample.tsx
   import { ChoroplethMap, ProvinceData } from "react-iran-maps";

   export function YourNewSample() {
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
   export { YourNewSample } from "./components/15-YourNewSample";
   ```

3. **Use in page.tsx**:
   ```typescript
   import { YourNewSample } from "./samples";
   // ... render it
   ```

## 🎨 Benefits of This Structure

- **Separation of Concerns**: Each test is isolated
- **Easy to Navigate**: Numbered files for clear ordering
- **Reusable**: Import individual samples anywhere
- **Scalable**: Easy to add/remove tests
- **Maintainable**: Changes to one test don't affect others
- **Clean Imports**: Barrel exports keep code tidy
