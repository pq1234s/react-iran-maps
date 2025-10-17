# react-iran-maps

Create powerful and interactive React SVG maps of Iran based on d3-geo, react-simple-maps, and topojson. This package provides ready-to-use map components featuring all Iranian provinces and counties with drill-down capabilities.

[![npm version](https://img.shields.io/npm/v/react-iran-maps.svg)](https://www.npmjs.com/package/react-iran-maps)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

✨ **Interactive Maps** - Click to drill down from provinces to counties  
🗺️ **Complete Coverage** - All 31 provinces and 429+ counties of Iran  
📊 **TopoJSON Based** - Lightweight and efficient geo data  
🎨 **Customizable Styling** - Full control over colors, hover effects, and interactions  
🌍 **Persian & English Support** - Bilingual property names  
⚡ **TypeScript Support** - Fully typed components and interfaces  
📱 **Responsive** - Works on all screen sizes

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
import { Map } from "react-iran-maps";

function App() {
  return (
    <div style={{ width: "100%", height: "600px" }}>
      <Map />
    </div>
  );
}
```

## Usage Examples

### Basic Map

Display an interactive map of Iran with all provinces:

```tsx
import { Map } from "react-iran-maps";

export default function IranMap() {
  return (
    <div style={{ width: "800px", height: "600px" }}>
      <Map />
    </div>
  );
}
```

### Features

The `Map` component includes:

1. **Province View**: Shows all 31 provinces of Iran
2. **County View**: Click on any province to see its counties
3. **Hover Effects**: Interactive hover states with visual feedback
4. **Navigation**: Built-in back button to return to province view
5. **Information Panel**: Displays current view state and hovered region
6. **Responsive Design**: Automatically adjusts to container size

### Interaction Flow

1. **Initial State**: Map displays all Iranian provinces
2. **Hover**: Hovering over a province highlights it and shows its name
3. **Click Province**: Clicking zooms into the selected province and shows its counties
4. **County View**: Counties are displayed with different styling
5. **Back Button**: Click "Back to Provinces" to return to the main view

## Component API

### Map Component

The main map component with built-in interactivity.

**Props**: Currently no props (coming soon: customization props)

**Features**:

- Automatic province/county switching
- Built-in hover states
- Click to drill-down functionality
- Information display panel
- Back navigation button

## Data Structure

The package includes high-quality TopoJSON data for Iran:

### Available Data Files

- `Shahrestan1400-3x-simple.json` - Simplified county boundaries (recommended for performance)
- `Shahrestan1400.json` - Full detail county boundaries
- `iran-provinces.json` - Province-level data
- `iran-counties.json` - County-level data
- `Iran1400.json` - Complete Iran map data
- `Iran1400geo-topo.json` - Alternative topology data

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
- **TypeScript** - Type safety and better DX

### Map Projection

- **Type**: Mercator (geoMercator)
- **Center**: [53.5, 32.5] (Center of Iran)
- **Scale**: 700 (provinces) / 1200 (counties - zoomed in)
- **Dimensions**: 800x600 (default, responsive to container)

## Roadmap

- [ ] Customizable color schemes
- [ ] Custom event handlers (onProvinceClick, onCountyClick, etc.)
- [ ] Tooltip support
- [ ] Data layer support for choropleth maps
- [ ] Custom styling props
- [ ] Labels and annotations
- [ ] Export/download map as image
- [ ] Accessibility improvements

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
