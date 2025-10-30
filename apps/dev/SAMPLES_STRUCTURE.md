# ChoroplethMap Test Samples - Project Structure

## 📁 Final Directory Structure

```
apps/dev/app/
├── page.tsx                    # Main page - Basic samples (Samples 1-7)
├── layout.tsx                  # Root layout
├── globals.css
├── components/
│   └── Navbar.tsx             # Navigation component
├── advanced/
│   └── page.tsx               # Advanced samples page (Samples 8-14)
└── samples/                   # Test samples directory
    ├── README.md              # Documentation for samples
    ├── index.ts               # Barrel export file
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

### Two-Page Navigation System

✅ **Page 1 - Basic Samples** (`/`)

- Empty/Default Map
- Quantitative data with default & custom colors
- Qualitative/Categorical data
- Interactive drilldown (numeric & categorical)
- Disabled tooltip

✅ **Page 2 - Advanced Samples** (`/advanced`)

- Custom tooltip rendering
- Different map sizes
- No legend
- Custom aspect ratio
- English province names
- Incomplete data handling
- Zero values handling

### Navigation Component

**Navbar Features:**

- Sticky navigation bar at the top
- Active page highlighting
- RTL-friendly design
- Smooth transitions

```typescript
// apps/dev/app/components/Navbar.tsx
export function Navbar() {
  // Highlights current page
  // Provides links to both pages
}
```

## 🗺️ Page Layout

### Basic Samples Page (`/`)

```typescript
import { Navbar } from "./components/Navbar";
import { /* 7 basic samples */ } from "./samples";

export default function Home() {
  return (
    <>
      <Navbar />
      <div>
        {/* 7 basic sample components */}
        <NavigationLink to="/advanced" />
      </div>
    </>
  );
}
```

### Advanced Samples Page (`/advanced`)

```typescript
import { Navbar } from "../components/Navbar";
import { /* 7 advanced samples */ } from "../samples";

export default function AdvancedPage() {
  return (
    <>
      <Navbar />
      <div>
        {/* 7 advanced sample components */}
        <NavigationLink to="/" />
      </div>
    </>
  );
}
```

## 📋 All Test Scenarios

### Basic Samples (Page 1)

| #   | Sample Name              | Tests                                       |
| --- | ------------------------ | ------------------------------------------- |
| 1   | EmptyMap                 | No data - all provinces white               |
| 2   | QuantitativeDefault      | Numeric data with default colors            |
| 3   | QuantitativeCustomColors | Numeric data with custom palette            |
| 4   | QualitativeData          | Categorical/risk level data                 |
| 5   | DrilldownQuantitative    | Interactive drilldown with numeric data     |
| 6   | DrilldownQualitative     | Interactive drilldown with categorical data |
| 7   | DisabledTooltip          | Map without tooltips                        |

### Advanced Samples (Page 2)

| #   | Sample Name       | Tests                        |
| --- | ----------------- | ---------------------------- |
| 8   | CustomTooltip     | Custom styled tooltip        |
| 9   | DifferentSizes    | Small & large map dimensions |
| 10  | NoLegend          | Map without legend           |
| 11  | CustomAspectRatio | Wide aspect ratio (2:1)      |
| 12  | EnglishNames      | English province names       |
| 13  | IncompleteData    | Partial data coverage        |
| 14  | ZeroValues        | Zero value handling          |

## 🚀 Running the Tests

```bash
cd apps/dev
npm run dev
```

Then visit:

- **Basic Samples**: http://localhost:3000
- **Advanced Samples**: http://localhost:3000/advanced

## 📝 Adding New Test Samples

1. **Create new component** in `samples/`:

   ```typescript
   "use client";

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
   export { YourNewSample } from "./15-YourNewSample";
   ```

3. **Add to appropriate page**:

   ```typescript
   // In page.tsx or advanced/page.tsx
   import { YourNewSample } from "./samples"; // or "../samples"

   // Then render it
   <YourNewSample />
   ```

## 🎨 Benefits of This Structure

### Organization

- **Clear Separation**: Basic vs Advanced samples
- **Easy Navigation**: Navbar for quick switching
- **Logical Grouping**: Related features together

### User Experience

- **Better Performance**: Split code across two pages
- **Easier Testing**: Focus on one category at a time
- **Clear Progress**: See which features you've tested

### Developer Experience

- **Modular Components**: Each test is isolated
- **Easy Maintenance**: Changes to one test don't affect others
- **Scalable**: Easy to add more pages/categories
- **Clean Imports**: Barrel exports keep code tidy

### Technical

- **Client Components**: All samples use "use client"
- **Next.js App Router**: Proper routing structure
- **TypeScript**: Full type safety
- **Responsive**: Works on all screen sizes

## 🔧 Technical Notes

- All sample components require `"use client"` directive
- `ChoroplethMap` uses React hooks (client-side only)
- Navbar uses Next.js `usePathname` for active state
- Pages use Next.js App Router structure
- RTL-friendly CSS with Tailwind
