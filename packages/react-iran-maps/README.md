# react-iran-maps

> Quick links: [Live Demos on CodeSandbox](https://codesandbox.io/dashboard/sandboxes/?workspace=ws_PYuCAKHwmkHLg8cwa9JEoJ) · [Example Samples on GitHub](https://github.com/rezasohrabi/react-iran-maps/tree/main/apps/dev/app/samples)

Create powerful and interactive React SVG maps of Iran based on d3-geo, react-simple-maps, and topojson. This package provides ready-to-use map components featuring all Iranian provinces and counties with drill-down capabilities.

[![npm version](https://img.shields.io/npm/v/react-iran-maps.svg)](https://www.npmjs.com/package/react-iran-maps) [![npm downloads](https://img.shields.io/npm/dm/react-iran-maps.svg)](https://www.npmjs.com/package/react-iran-maps) [![bundle size](https://img.shields.io/bundlephobia/minzip/react-iran-maps) ![minified](https://badgen.net/bundlephobia/min/react-iran-maps)](https://bundlephobia.com/package/react-iran-maps) [![license](https://img.shields.io/github/license/rezasohrabi/react-iran-maps)](LICENSE) [![TypeScript](https://img.shields.io/badge/TypeScript-5.9%2B-blue)](https://www.typescriptlang.org/) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/rezasohrabi/react-iran-maps/pulls)

![Demo](https://raw.githubusercontent.com/rezasohrabi/react-iran-maps/main/packages/react-iran-maps/demo.gif)

## Features

✨ **Interactive Maps** - Click to drill down from provinces to counties
🗺️ **Complete Coverage** - All 31 provinces and 429+ counties of Iran
📊 **TopoJSON Based** - Lightweight and efficient geo data
🎨 **Dual Legend Modes** - Quantitative (numeric) and Qualitative (categorical) data visualization
🌈 **Customizable Colors** - Full control over color gradients and category colors
🎯 **Smart Tooltips** - Built-in tooltips with custom content rendering
🎬 **Smooth Animations** - Fluid transitions powered by Motion library
🌍 **Persian & English Support** - Bilingual property names
⚡ **TypeScript Support** - Fully typed components and interfaces
📱 **Responsive** - Works on all screen sizes with configurable aspect ratio

## Installation

```bash
npm install react-iran-maps
# or
pnpm add react-iran-maps
# or
yarn add react-iran-maps
```

## Quick Start

```tsx
import { ChoroplethMap } from "react-iran-maps";

function App() {
  return (
    <div style={{ width: "100%", height: "600px" }}>
      <ChoroplethMap />
    </div>
  );
}
```

## Usage Examples

### Basic Map

Display a static map of Iran with all provinces (no drill-down):

```tsx
import { ChoroplethMap } from "react-iran-maps";

export default function BasicMap() {
  return (
    <div style={{ width: "800px", height: "600px" }}>
      <ChoroplethMap />
    </div>
  );
}
```

### Interactive Map with Drill-Down

Enable interactive drill-down to explore province counties:

```tsx
import { ChoroplethMap } from "react-iran-maps";

export default function InteractiveMap() {
  return (
    <div style={{ width: "800px", height: "600px" }}>
      <ChoroplethMap drilldown={true} />
    </div>
  );
}
```

When `drilldown` is enabled:

- **Click on any province** to zoom in and view its counties
- **Smooth animations** transition between province and county views
- **Breadcrumb navigation** appears showing "ایران / ProvinceName"
- **Click "ایران"** in the breadcrumb to return to the main view

### Data Visualization (Choropleth Maps)

The `ChoroplethMap` component supports two types of data visualization:

#### 1. Quantitative (Numeric) Data

Display numeric data with an automatic gradient-based color scale:

```tsx
import { ChoroplethMap, ProvinceData } from "react-iran-maps";

const populationData: ProvinceData[] = [
  {
    name: "تهران",
    value: 15000000,
    counties: [
      { name: "تهران", value: 8500000 },
      { name: "ری", value: 2000000 },
      { name: "ورامین", value: 1200000 },
      { name: "شهریار", value: 800000 },
      { name: "اسلامشهر", value: 600000 },
      { name: "پاکدشت", value: 400000 },
    ],
  },
  {
    name: "اصفهان",
    value: 5120000,
    counties: [
      { name: "اصفهان", value: 2000000 },
      { name: "کاشان", value: 500000 },
      { name: "نجف‌آباد", value: 400000 },
    ],
  },
  // ... more provinces
];

export default function QuantitativeMap() {
  return (
    <div style={{ width: "100%", height: "600px" }}>
      <ChoroplethMap
        drilldown
        data={populationData}
        legend={{
          mode: "quantitative",
          colors: ["#FFEECB", "#FFDFA0", "#FFD47F", "#FFC759", "#FFB728"],
        }}
      />
    </div>
  );
}
```

#### 2. Qualitative (Categorical) Data

Display categorical data with distinct colors for each category:

```tsx
import { ChoroplethMap, ProvinceData } from "react-iran-maps";

const categoryData: ProvinceData[] = [
  {
    name: "تهران",
    value: "بالا",
    counties: [
      { name: "تهران", value: "بالا" },
      { name: "شمیرانات", value: "بالا" },
      { name: "ری", value: "متوسط" },
      { name: "ورامین", value: "متوسط" },
      { name: "شهریار", value: "پایین" },
    ],
  },
  {
    name: "اصفهان",
    value: "متوسط",
    counties: [
      { name: "اصفهان", value: "بالا" },
      { name: "کاشان", value: "متوسط" },
      { name: "نجف‌آباد", value: "پایین" },
    ],
  },
  // ... more provinces
];

export default function QualitativeMap() {
  return (
    <div style={{ width: "100%", height: "600px" }}>
      <ChoroplethMap
        drilldown
        data={categoryData}
        legend={{
          mode: "qualitative",
          items: [
            { value: "پایین", color: "#e8f5e9", label: "پایین" },
            { value: "متوسط", color: "#81c784", label: "متوسط" },
            { value: "بالا", color: "#2e7d32", label: "بالا" },
          ],
        }}
      />
    </div>
  );
}
```

**Data Structure**:

```typescript
interface CountyData {
  name: string; // County name (in Persian)
  value?: string | number; // Value to display (number for quantitative, string for qualitative)
}

interface ProvinceData {
  name: string; // Province name (in Persian)
  value?: string | number; // Value to display
  counties?: CountyData[]; // Optional county-level data
}
```

**Legend Modes**:

- **Quantitative**: Automatically creates a gradient-based color scale for numeric values
- **Qualitative**: Maps specific string values to custom colors for categorical data

**Features**:

- **Automatic Color Mapping**: Values are automatically mapped to colors based on legend configuration
- **Interactive Tooltips**: Hover over regions to see their values
- **County-Level Data**: Support for both province and county-level data
- **Custom Color Schemes**: Define your own color gradients or category colors
- **Smart Legend**: Automatically displays the appropriate legend type

### Custom Tooltip Content

Customize the tooltip content by providing a `renderTooltipContent` function:

```tsx
import { ChoroplethMap, ProvinceMapItem, CountyFeature } from "react-iran-maps";

const customTooltipRenderer = (
  provinceData?: ProvinceMapItem,
  geo?: CountyFeature
) => {
  if (!provinceData) return "";

  const locationName = geo?.properties.cityName || provinceData.name;
  const valueLabel =
    typeof provinceData.value === "number"
      ? `تعداد: ${provinceData.value.toLocaleString("fa-IR")}`
      : `دسته: ${provinceData.value}`;

  return `
    <div style="text-align: right; direction: rtl; padding: 8px;">
      <h3 style="margin: 0 0 8px 0; color: #333; font-size: 16px;">
        ${locationName}
      </h3>
      <p style="margin: 0; color: #666; font-size: 14px;">
        ${valueLabel}
      </p>
    </div>
  `;
};

export default function CustomTooltipMap() {
  return (
    <div style={{ width: "100%", height: "600px" }}>
      <ChoroplethMap
        drilldown
        data={mapData}
        renderTooltipContent={customTooltipRenderer}
      />
    </div>
  );
}
```

### Component Features

The `ChoroplethMap` component includes:

1. **Province View**: Shows all 31 provinces of Iran with data visualization
2. **County Drill-Down**: Click on any province to explore its counties (when `drilldown` is enabled)
3. **Smooth Animations**: Powered by Motion library for fluid transitions between views
4. **Dual Legend Modes**: Quantitative (gradient) and Qualitative (categorical) legends
5. **Interactive Tooltips**: Built-in tooltips with customizable content rendering
6. **Smart Color Mapping**: Automatic color assignment based on data values
7. **Breadcrumb Navigation**: Shows current location (ایران/ProvinceName) with clickable back button
8. **Responsive Design**: Automatically adjusts to container size with configurable aspect ratio
9. **Persian Support**: Full RTL support with Persian labels and formatting
10. **TypeScript**: Fully typed for better developer experience

### Interaction Flow

1. **Initial State**: Map displays all 31 Iranian provinces
2. **Hover**: Hovering over a province shows tooltip with name and data value
3. **Click Province** (if `drilldown` enabled): Smoothly zooms into the selected province and shows its counties
4. **County View**: Counties are displayed with breadcrumb showing "ایران / ProvinceName"
5. **Navigation**: Click "ایران" in breadcrumb to return to province view with smooth animation
6. **Legend**: Automatically displays the appropriate legend (quantitative or qualitative) based on data type
7. **Custom Tooltips**: Full control over tooltip content via `renderTooltipContent` prop

## Component API

### ChoroplethMap Component

The main map component with built-in interactivity and data visualization.

**Props**:

| Prop                   | Type                              | Default              | Description                                                                                                                             |
| ---------------------- | --------------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `drilldown`            | `boolean`                         | `false`              | When `true`, enables interactive drill-down to explore province counties by clicking on provinces.                                      |
| `data`                 | `ProvinceData[]`                  | `undefined`          | Array of province data with values (numeric or string) and optional county data for visualization.                                      |
| `legend`               | `LegendConfig`                    | `undefined`          | Legend configuration object. Can be quantitative (with colors array) or qualitative (with items array). See Legend Configuration below. |
| `disableTooltip`       | `boolean`                         | `false`              | When `true`, disables tooltip functionality.                                                                                            |
| `width`                | `number`                          | `800`                | Width of the map SVG in pixels.                                                                                                         |
| `height`               | `number`                          | `600`                | Height of the map SVG in pixels.                                                                                                        |
| `scale`                | `number`                          | `width/height * 3.4` | Custom scale for map projection. Higher values zoom in more.                                                                            |
| `aspectRatio`          | `string`                          | `"1.23"`             | CSS aspect ratio for responsive container sizing.                                                                                       |
| `renderTooltipContent` | `(provinceData?, geo?) => string` | `undefined`          | Custom function to render tooltip HTML content. Receives province/county data and geography object.                                     |

**Legend Configuration**:

```typescript
// Quantitative Legend (for numeric data)
interface QuantitativeLegend {
  mode: "quantitative";
  colors: string[]; // Array of colors for gradient (e.g., ["#FFEECB", "#FFB728"])
  disable?: boolean; // Optional: hide legend
}

// Qualitative Legend (for categorical data)
interface QualitativeLegend {
  mode: "qualitative";
  items: Array<{
    value: string; // Category value
    color: string; // Color for this category
    label: string; // Display label
  }>;
  disable?: boolean; // Optional: hide legend
}

type LegendConfig = QuantitativeLegend | QualitativeLegend;
```

**Usage Examples**:

```tsx
// Basic static map
<ChoroplethMap />

// Interactive map with drill-down
<ChoroplethMap drilldown />

// Quantitative data with custom colors
<ChoroplethMap
  drilldown
  data={populationData}
  legend={{
    mode: "quantitative",
    colors: ["#E0F2FE", "#0369A1"],
  }}
/>

// Qualitative (categorical) data
<ChoroplethMap
  drilldown
  data={categoryData}
  legend={{
    mode: "qualitative",
    items: [
      { value: "low", color: "#e8f5e9", label: "Low" },
      { value: "medium", color: "#81c784", label: "Medium" },
      { value: "high", color: "#2e7d32", label: "High" },
    ],
  }}
/>

// Custom dimensions and scale
<ChoroplethMap
  width={1000}
  height={800}
  scale={3500}
  aspectRatio="1.25"
/>

// Custom tooltip
<ChoroplethMap
  data={mapData}
  renderTooltipContent={(data, geo) =>
    `<div>${data?.name}: ${data?.value}</div>`
  }
/>

// Disable tooltip
<ChoroplethMap disableTooltip />
```

**Features**:

- Automatic province/county switching with smooth animations
- Dual legend modes (quantitative gradient & qualitative categorical)
- Built-in hover states with customizable tooltips
- Click to drill-down functionality (when enabled)
- Breadcrumb navigation (ایران / ProvinceName)
- Responsive design with customizable dimensions
- Full TypeScript support with complete type definitions
- Optimized for performance with TopoJSON data

## Data Structure

The package includes high-quality TopoJSON data for Iran:

### Data Properties

#### County (Shahrestan) Properties

```typescript
{
  OBJECTID_1: number;
  provincName: string; // Province name in Persian (e.g., "تهران")
  cityName: string; // County name in Persian (e.g., "شهریار")
  NAME_1: string; // Province name in English
  NAME_2: string; // County name in English
  NL_NAME_1: string; // Province native name
  NL_NAME_2: string; // County native name
  area: number;
  perimeter: number;
  Shape_Area: number;
  Shape_Leng: number;
}
```

#### Province Properties

```typescript
{
  NAME_1: string; // Province name in English
  NL_NAME_1: string; // Province name in Persian
  provincName: string; // Province name in Persian
  countyCount: number; // Number of counties in province
  GID_1: string; // Geographic ID
  COUNTRY: string; // Country name
}
```

## Technical Details

### Built With

- **react-simple-maps** - React components for creating SVG maps
- **d3-geo** - Geographic projections and paths
- **topojson-client** - TopoJSON parsing and manipulation
- **Motion** - Smooth animations and transitions
- **react-tooltip** - Interactive tooltip system
- **TypeScript** - Type safety and better DX

### Map Projection

- **Type**: Mercator (geoMercator)
- **Center**: [53.5, 32.5] (Center of Iran)
- **Scale**: 700 (provinces) / 1200 (counties - zoomed in)
- **Dimensions**: 800x600 (default, responsive to container)

## Roadmap

**Completed Features**:

- [x] Interactive drill-down from provinces to counties
- [x] Dual legend modes (quantitative & qualitative)
- [x] Customizable color schemes for both legend types
- [x] Data layer support for choropleth maps
- [x] Smart tooltip system with custom content rendering
- [x] Smooth animations powered by Motion library
- [x] Breadcrumb navigation with back button
- [x] Responsive design with configurable dimensions
- [x] Full TypeScript support with complete type definitions
- [x] Persian and English bilingual support

**Planned Features**:

- [ ] Custom event handlers (`onProvinceClick`, `onCountyClick`, `onProvinceHover`, etc.)
- [ ] Additional styling props for borders, fills, and hover states
- [ ] Province and county labels with optional visibility
- [ ] Custom annotations and markers
- [ ] Export/download map as PNG/SVG
- [ ] Zoom controls (buttons)
- [ ] Touch gesture support for mobile devices
- [ ] Accessibility improvements (ARIA labels, keyboard navigation)
- [ ] Performance optimizations for large datasets
- [ ] Additional map projections

## Development

This package is part of a monorepo. For development:

```bash
# Install dependencies
pnpm install

# Build the package
pnpm build

# Watch mode for development
pnpm dev

# Type checking
pnpm check-types

# Linting
pnpm lint
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [rezasohrabi](https://github.com/rezasohrabi)

## Credits

- Map data based on Iran administrative boundaries (1400/2021)
- Built with [react-simple-maps](https://www.react-simple-maps.io/)
- Powered by [d3-geo](https://github.com/d3/d3-geo) and [topojson](https://github.com/topojson/topojson)

## Support

If you find this package helpful, please consider giving it a ⭐️ on [GitHub](https://github.com/rezasohrabi/react-iran-maps)!

## Provinces and Counties

Based on the included TopoJSON data, here is a list of provinces and their counties in Persian and English:

| Province (FA)       | Province (EN)            | Counties (FA)                                                                                                                                                                                                                                                                        | Counties (EN)                                                                                                                                                                                                                                                                                                                             |
| ------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| آذربایجان شرقی      | EastAzarbaijan           | آذرشهر, اسکو, اهر, بستان آباد, بناب, تبریز, جلفا, چاراویماق, خدا آفرین, سراب, شبستر, عجب شیر, کلیبر, مراغه, مرند, ملکان, میانه, ورزقان, هریس, هشترود, هوراند                                                                                                                         | Ahar, Ajab Shir, Azarshahr, Bonab, Bostanabad, Charuymaq, Hashtrud, Heris, Hurand, Jolfa, Kaleybar, Khoda Afarin, Malekan, Maragheh, Marand, Mianeh, Osku, Sarab, Shabestar, Tabriz, Varzaqan                                                                                                                                             |
| آذربایجان غربی      | WestAzarbaijan           | ارومیه, اشنویه, باروق, بوکان, پلدشت, پیرانشهر, تکاب, جایپاره, چالدران, چهاربرج, خوی, سردشت, سلماس, شاهین دژ, شوط, ماکو, مهاباد, میاندوآب, نقده                                                                                                                                       | Baruq, Bukan, Chaharborj, Chaldoran, Chaypareh, Khoy, Mahabad, Maku, Miandoab, Naqadeh, Oshnavieh, Piranshahr, Poldasht, Salmas, Sardasht, Shahin Dezh, Showt, Takab, Urmia                                                                                                                                                               |
| اردبیل              | Ardebil                  | اردبیل, اصلاندوز, انگوت, بیله سوار, پارس آباد, خلخال, سرعین, کوثر, گرمی, مشگین شهر, نمین, نیر                                                                                                                                                                                        | Angut, Ardabil, Aslan Duz, Bileh Savar, Germi, Khalkhal, Kowsar, Meshgin Shahr, Namin, Nir, Parsabad, Sareyn                                                                                                                                                                                                                              |
| اصفهان              | Esfahan                  | آرلن و بیدگل, اردستان, اصفهان, برخوار, بوئین میاندشت, تیران و کرون, جرقریه, چادگان, خمینی شهر, خوانسار, خور و بیابانک, دهاقان, سمیرم, شاهین شهر و می, شهرضا, فریدن, فریدون شهر, فلاورجان, کاشان, کوهپایه, گلپایگان, لنجان, مبارکه, نائین, نجف آباد, نطنز, ورزنه, هرند                | Aran va Bidgol, Ardestan, Borkhar, Buin Miandasht, Chadegan, Dehaqan, Falavarjan, Faridan, Fereydunshahr, Golpayegan, Harand, Isfahan, Jarqavieh, Kashan, Khansar, Khomeyni Shahr, Khur and Biabanak, Kuhpayeh, Lenjan, Mobarakeh, Nain, Najafabad, Natanz, Semirom, Shahin Shahr and Meymeh, Shahreza, Tiran and Karvan, Varzaneh        |
| البرز               | Alborz                   | اشتهارد, چهارباغ, ساوجبلاغ, طالقان, فردیس, کرج, نظر آباد                                                                                                                                                                                                                             | Chaharbagh, Eshtehard, Fardis, Karaj, Nazarabad, Savojbolagh, Taleqan                                                                                                                                                                                                                                                                     |
| ایلام               | Ilam                     | آبدانان, ایلام, ایوان, بدره, چرداول, چوار, دره شهر, دهلران, سیروان, ملکشاهی, مهران, هلیلان                                                                                                                                                                                           | Abdanan, Badreh, Chardavol, Chavar, Darreh Shahr, Dehloran, Eyvan, Holeylan, Ilam, Malekshahi, Mehran, Sirvan                                                                                                                                                                                                                             |
| بوشهر               | Bushehr                  | بوشهر, تنگستان, جم, دشتستان, دشتی, دیر, دیلم, عسلویه, کنگان, گناوه                                                                                                                                                                                                                   | Asaluyeh, Bushehr, Dashtestan, Dashti, Deylam, Deyr, Ganaveh, Jam, Kangan, Tangestan                                                                                                                                                                                                                                                      |
| تهران               | Tehran                   | اسلامشهر, بهارستان, پاکدشت, پردیس, پیشوا, تهران, دماوند, رباط کریم, ری, شمیرانات, شهریار, فیروزکوه, قدس, قرچک, ملارد, ورامین                                                                                                                                                         | Baharestan, Damavand, Eslamshahr, Firuzkuh, Malard, Pakdasht, Pardis, Pishva, Qarchak, Qods, Ray, Robat Karim, Shahriar, Shemiranat, Tehran, Varamin                                                                                                                                                                                      |
| چهارمحال و بختیاری  | ChaharMahallandBakhtiari | اردل, بروجن, بن, خانمیرزا, سامان, شهرکرد, فارسان, کوهرنگ, کیار, لردگان                                                                                                                                                                                                               | Ardal, Ben, Borujen, Farsan, Khanmirza, Kiar, Kuhrang, Lordegan, Saman, Shahrekord                                                                                                                                                                                                                                                        |
| خراسان جنوبی        | SouthKhorasan            | بشرویه, بیرجند, خوسف, درمیان, زیرکوه, سرایان, سربیشه, طبس, فردوس, قائنات, نهبندان                                                                                                                                                                                                    | Birjand, Boshruyeh, Darmian, Ferdows, Khusf, Nehbandan, Qaen, Sarayan, Sarbisheh, Tabas, Zirkuh                                                                                                                                                                                                                                           |
| خراسان رضوی         | RazaviKhorasan           | باخزر, بجستان, بردسکن, بینالود, تایباد, تربت جام, تربت حیدریه, جغتای, جوین, چناران, خليل آباد, خواف, خوشاب, داورزن, درگز, رشتخوار, زاوه, زبر خان, سبزوار, سرخس, ششتمد, صالح آباد, فريمان, فیروزه, قوچان, کاشمر, کلات, کوهسرخ, گلبهار, گناباد, مشهد, مه ولات, نيشابور                 | Bajestan, Bakharz, Bardaskan, Binalud, Chenaran, Dargaz, Davarzan, Fariman, Firuzeh, Golbahar, Gonabad, Joghatai, Joveyn, Kalat, Kashmar, Khaf, Khalilabad, Khoshab, Kuhsorkh, Mahvelat, Mashhad, Nishapur, Quchan, Roshtkhar, Sabzevar, Salehabad, Sarakhs, Sheshtamad, Taybad, Torbat-e Heydarieh, Torbat-e Jam, Zaveh, Zeberkhan       |
| خراسان شمالی        | NorthKhorasan            | اسفراین, بجنورد, جاجرم, راز و جرگلان, شیروان, فاروج, گرمه, مانه و سملقان                                                                                                                                                                                                             | Bojnord, Esfarayen, Faruj, Garmeh, Jajrom, Maneh and Samalqan, Raz and Jargalan, Shirvan                                                                                                                                                                                                                                                  |
| خوزستان             | Khuzestan                | آبادان, آغاجاری, امیدیه, اندیکا, اندیمشک, اهواز, ایذه, باغ ملک, باوی, بندرماهشهر, بهبهان, حمیدیه, خرمشهر, دزپارت, دزفول, دشت آزادگان, رامشیر, رامهرمز, شادگان, شوش, شوشتر, کارون, کرخه, گتوند, لالی, مسجد سلیمان, هفتگل, هندیجان, هویزه                                              | Abadan, Aghajri, Ahvaz, Andika, Andimeshk, Bagh-e Malek, Bavi, Behbahan, Dasht-e Azadegan, Dezful, Dezpart, Gotvand, Haftkel, Hamidiyeh, Hendijan, Hoveyzeh, Izeh, Karkheh, Karun, Khorramshahr, Lali, Mahshahr, Masjed Soleyman, Omidiyeh, Ramhormoz, Ramshir, Shadegan, Shush, Shushtar                                                 |
| زنجان               | Zanjan                   | ابهر, ایجرود, خدابنده, خرمدره, زنجان, سلطانیه, طارم, ماهنشان                                                                                                                                                                                                                         | Abhar, Ijrud, Khodabandeh, Khorramdarreh, Mahneshan, Soltaniyeh, Tarom, Zanjan                                                                                                                                                                                                                                                            |
| سمنان               | Semnan                   | آرادان, دامغان, سرخه, سمنان, شاهرود, گرمسار, مهدی شهر, میامی                                                                                                                                                                                                                         | Aradan, Damghan, Garmsar, Mehdishahr, Meyami, Semnan, Shahrud, Sorkheh                                                                                                                                                                                                                                                                    |
| سیستان و بلوچستان   | SistanandBaluchestan     | ایرانشهر, بمپور, تفتان, چاه بهار, خاش, دشتیاری, دلگان, راسک, زابل, زاهدان, زرآباد, زهک, سراوان, سرباز, سیب و سوران, فنوج, قصر قند, کنارک, گلشن, لاشار, مهرستان, میرجاوه, نیک شهر, نیمروز, هامون, هیرمند                                                                              | Bampur, Chabahar, Dalgan, Dashtiari, Fanuj, Golshan, Hamun, Hirmand, Iranshahr, Khash, Konarak, Lashar, Mehrestan, Mirjaveh, Nik Shahr, Nimruz, Qasr-e Qand, Rask, Saravan, Sarbaz, Sib and Suran, Taftan, Zabol, Zahedan, Zarabad, Zehak                                                                                                 |
| فارس                | Fars                     | آباده, ارسنجان, استهبان, اقلید, اوز, بختگان, بوانات, بیضاء, پاسارگاد, جهرم, خرامه, خرم بید, خفر, خنج, داراب, رستم, زرقان, زرین دشت, سپیدان, سرچهان, سروستان, شیراز, فراشبند, فسا, فیروز آباد, قیر و کارزین, کازرون, کوار, کوه چنار, گراش, لارستان, لامرد, مرودشت, ممسنی, مهر, نی ریز | Abadeh, Arsanjan, Bakhtegan, Bavanat, Beyza, Darab, Eqlid, Estahban, Evaz, Farashband, Fasa, Firuzabad, Gerash, Jahrom, Kavar, Kazerun, Khafr, Kharameh, Khonj, Khorrambid, Kuhchenar, Lamerd, Larestan, Mamasani, Marvdasht, Mohr, Neyriz, Pasargad, Qir and Karzin, Rostam, Sarchehan, Sarvestan, Sepidan, Shiraz, Zarqan, Zarrin Dasht |
| قزوین               | Qazvin                   | آبیک, آوج, البرز, بوئین زهرا, تاکستان, قزوین                                                                                                                                                                                                                                         | Abyek, Alborz, Avaj, Buin Zahra, Qazvin, Takestan                                                                                                                                                                                                                                                                                         |
| قم                  | Qom                      | جعفرآباد, قم, کهک                                                                                                                                                                                                                                                                    | Jafarabad, Kahak, Qom                                                                                                                                                                                                                                                                                                                     |
| کردستان             | Kordestan                | بانه, بیجار, دهگلان, دیواندره, سرو آباد, سقز, سنندج, قروه, کامیاران, مریوان                                                                                                                                                                                                          | Baneh, Bijar, Dehgolan, Divandarreh, Kamyaran, Marivan, Qorveh, Sanandaj, Saqqez, Sarvabad                                                                                                                                                                                                                                                |
| کرمان               | Kerman                   | ارزوئیه, انار, بافت, بردسیر, بم, جیرفت, رابر, راور, رفسنجان, رودبار جنوب, ریگان, زرند, سیرجان, شهر بابک, عنبرآباد, فاریاب, فهرج, قلعه گنج, کرمان, کوهبنان, کهنوج, منوجان, نرماشیر                                                                                                    | Anar, Anbarabad, Arzuiyeh, Baft, Bam, Bardsir, Fahraj, Faryab, Jiroft, Kahnuj, Kerman, Kuhbanan, Manujan, Narmashir, Qaleh Ganj, Rabor, Rafsanjan, Ravar, Rigan, Rudbar-e Jonubi, Shahr-e Babak, Sirjan, Zarand                                                                                                                           |
| کرمانشاه            | Kermanshah               | اسلام آباد غر, پاوه, ثلاث باباجانی, جوانرود, دالاهو, روانسر, سر پل ذهاب, سنقر, صحنه, قصر شیرین, کرمانشاه, کنگاور, گیلانغرب, هرسین                                                                                                                                                    | Dalahu, Eslamabad-e Gharb, Gilan-e Gharb, Harsin, Javanrud, Kangavar, Kermanshah, Paveh, Qasr-e Shirin, Ravansar, Sahneh, Salas-e Babajani, Sarpol-e Zahab, Sonqor                                                                                                                                                                        |
| کهگیلویه و بویراحمد | KohgiluyehandBuyerAhmad  | باشت, بویراحمد, بهمئی, چرام, دنا, کهگیلویه, گچساران, لنده, مارگون                                                                                                                                                                                                                    | Bahmai, Basht, Boyer-Ahmad, Charam, Dana, Gachsaran, Kohgiluyeh, Landeh, Margown                                                                                                                                                                                                                                                          |
| گلستان              | Golestan                 | آزادشهر, آق قلا, بندرترکمن, بندرگز, رامیان, علی آباد کتول, کردکوی, کلاله, گاليكش, گرگان, گمیشان, گنبد کاووس, مراوه تپه, مینو دشت                                                                                                                                                     | Aliabad, Aqqala, Azadshahr, Bandar-e Gaz, Galikash, Gomishan, Gonbad-e Kavus, Gorgan, Kalaleh, Kordkuy, Maraveh Tappeh, Minudasht, Ramian, Torkaman                                                                                                                                                                                       |
| گیلان               | Gilan                    | آستارا, آستانه اشرفیه, املش, بندرلنزلی, خمام, رشت, رضوانشهر, رودبار, رودسر, سیاهکل, شفت, صومعه سرا, طوالش, فومن, لاهیجان, لنگرود, ماسال                                                                                                                                              | Amlash, Astaneh-ye Ashrafiyeh, Astara, Bandar-e Anzali, Fuman, Khomam, Lahijan, Langarud, Masal, Rasht, Rezvanshahr, Rudbar, Rudsar, Shaft, Siahkal, Sowme'eh Sara, Talesh                                                                                                                                                                |
| لرستان              | Lorestan                 | ازنا, الیگودرز, بروجرد, پلدختر, چگنی, خرم آباد, دلفان, دورود, رومشکان, سلسله, کوه دشت                                                                                                                                                                                                | Aligudarz, Azna, Borujerd, Chegeni, Delfan, Dorud, Khorramabad, Kuhdasht, Pol-e Dokhtar, Rumeshkan, Selseleh                                                                                                                                                                                                                              |
| مازندران            | Mazandaran               | آمل, بابل, بابلسر, بهشهر, تنکابن, جویبار, چالوس, رامسر, ساری, سوادکوه, سوادکوه شمالی, سیمرغ, عباس آباد, فریدونکنار, قائم شهر, کلاردشت, گلوگاه, محمودآباد, میاندورود, نکا, نور, نوشهر                                                                                                 | Abbasabad, Amol, Babol, Babolsar, Behshahr, Chalus, Fereydunkenar, Galugah, Juybar, Kelardasht, Mahmudabad, Miandorud, Neka, North Savadkuh, Nowshahr, Nur, Qaem Shahr, Ramsar, Sari, Savadkuh, Simorgh, Tonekabon                                                                                                                        |
| مرکزی               | Markazi                  | آشتیان, اراک, تفرش, خمین, خنداب, دلیجان, زرندیه, ساوه, شازند, فراهان, کمیجان, محلات                                                                                                                                                                                                  | Arak, Ashtian, Delijan, Farahan, Khomeyn, Khondab, Komijan, Mahallat, Saveh, Shazand, Tafresh, Zarandiyeh                                                                                                                                                                                                                                 |
| هرمزگان             | Hormozgan                | ابوموسی, بستک, بشاگرد, بندرعباس, بندرلنگه, پارسیان, جاسک, حاجی آباد, خمیر, رودان, سیریک, قشم, میناب                                                                                                                                                                                  | Abumusa, Bandar Abbas, Bandar Lengeh, Bashagard, Bastak, Hajjiabad, Jask, Khamir, Minab, Parsian, Qeshm, Rudan, Sirik                                                                                                                                                                                                                     |
| همدان               | Hamadan                  | اسدآباد, بهار, تویسرکان, درگزین, رزن, فامنین, کبودرآهنگ, ملایر, نهاوند, همدان                                                                                                                                                                                                        | Asadabad, Bahar, Dargazin, Famenin, Hamadan, Kabudarahang, Malayer, Nahavand, Razan, Tuyserkan                                                                                                                                                                                                                                            |
| یزد                 | Yazd                     | ابرکوه, اردکان, اشکذر, بافق, بهاباد, تفت, خاتم, مروست, مهریز, میبد, یزد                                                                                                                                                                                                              | Abarkuh, Ardakan, Ashkezar, Bafq, Behabad, Khatam, Marvast, Mehriz, Meybod, Taft, Yazd                                                                                                                                                                                                                                                    |
