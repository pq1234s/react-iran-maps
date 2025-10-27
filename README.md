# react-iran-maps

A powerful React library for creating interactive SVG maps of Iran with province and county-level visualizations. Built with d3-geo, react-simple-maps, and topojson for optimal performance and flexibility.

[![npm version](https://img.shields.io/npm/v/react-iran-maps.svg)](https://www.npmjs.com/package/react-iran-maps) [![npm downloads](https://img.shields.io/npm/dm/react-iran-maps.svg)](https://www.npmjs.com/package/react-iran-maps) [![license](https://img.shields.io/github/license/rezasohrabi/react-iran-maps)](LICENSE) [![TypeScript](https://img.shields.io/badge/TypeScript-5.9%2B-blue)](https://www.typescriptlang.org/)

## 🚀 Quick Start

```bash
npm install react-iran-maps
# or
pnpm add react-iran-maps
# or
yarn add react-iran-maps
```

```tsx
import { ChoroplethMap } from "react-iran-maps";

function App() {
  return (
    <div style={{ width: "100%", height: "600px" }}>
      <ChoroplethMap drilldown />
    </div>
  );
}
```

## 📚 Documentation

For complete documentation, examples, and API reference, see the [package README](./packages/react-iran-maps/README.md).

## ✨ Key Features

- 🗺️ **Complete Coverage** - All 31 provinces and 429+ counties of Iran
- 🎯 **Interactive Drill-Down** - Click provinces to explore county-level data
- 🎨 **Dual Legend Modes** - Quantitative (numeric) and Qualitative (categorical) visualizations
- 🎬 **Smooth Animations** - Fluid transitions powered by Motion library
- 🌍 **Bilingual Support** - Persian and English property names
- ⚡ **TypeScript** - Fully typed components and interfaces
- 📱 **Responsive** - Works seamlessly on all screen sizes

## 🏗️ Project Structure

This is a monorepo managed with Turborepo:

### Apps and Packages

- `packages/react-iran-maps`: The main NPM package - interactive Iran map components
- `apps/docs`: [Next.js](https://nextjs.org/) documentation and demo site
- `apps/web`: Additional [Next.js](https://nextjs.org/) web application
- `packages/eslint-config`: Shared `eslint` configurations
- `packages/typescript-config`: Shared `tsconfig.json` files

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## 🛠️ Development

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn

### Getting Started

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Start development mode (watches for changes)
pnpm dev
```

### Building Specific Packages

```bash
# Build only the react-iran-maps package
pnpm --filter react-iran-maps build

# Build the docs site
pnpm --filter docs build
```

### Development Workflow

```bash
# Run docs site in development mode
pnpm --filter docs dev

# Run the main package in watch mode
pnpm --filter react-iran-maps dev

# Type checking
pnpm check-types

# Linting
pnpm lint
```

### Package Scripts

The `react-iran-maps` package includes:

- `pnpm build` - Build the package for production
- `pnpm dev` - Watch mode for development
- `pnpm lint` - Run ESLint
- `pnpm check-types` - Type checking with TypeScript

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```bash
cd my-turborepo

# With global turbo installed (recommended)
turbo login

# Without global turbo, use your package manager
npx turbo login
yarn exec turbo login
pnpm exec turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```bash
# With global turbo installed (recommended)
turbo link

# Without global turbo, use your package manager
npx turbo link
yarn exec turbo link
pnpm exec turbo link
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Write tests for new features
- Follow the existing code style
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📄 License

MIT © [rezasohrabi](https://github.com/rezasohrabi)

See [LICENSE](LICENSE) file for details.

## 🙏 Credits

- Map data based on Iran administrative boundaries (1400/2021)
- Built with [react-simple-maps](https://www.react-simple-maps.io/)
- Powered by [d3-geo](https://github.com/d3/d3-geo) and [topojson](https://github.com/topojson/topojson)
- Smooth animations powered by [Motion](https://motion.dev/)
- Interactive tooltips by [react-tooltip](https://react-tooltip.com/)

## 💖 Support

If you find this package helpful, please consider:

- Giving it a ⭐️ on [GitHub](https://github.com/rezasohrabi/react-iran-maps)
- Sharing it with others who might find it useful
- [Contributing](#-contributing) to make it better

## 🔗 Useful Links

### Turborepo Resources

- [Tasks](https://turborepo.com/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.com/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching)
- [Configuration](https://turborepo.com/docs/reference/configuration)

### Package Documentation

- [Complete API Documentation](./packages/react-iran-maps/README.md)
- [npm Package](https://www.npmjs.com/package/react-iran-maps)
- [GitHub Repository](https://github.com/rezasohrabi/react-iran-maps)
