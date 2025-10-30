# Contributing to react-iran-maps

First off, thank you for considering contributing to react-iran-maps! 🎉 This project aims to make creating interactive maps of Iran simple and powerful for React developers. Your contributions help make this library better for everyone.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Project Structure](#project-structure)
- [Making Changes](#making-changes)
- [Testing Your Changes](#testing-your-changes)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Coding Standards](#coding-standards)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Community and Support](#community-and-support)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [rezasohrab20@gmail.com](mailto:rezasohrab20@gmail.com).

## How Can I Contribute?

There are many ways you can contribute to react-iran-maps:

### 🐛 Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the behavior
- **Expected behavior** vs **actual behavior**
- **Screenshots** if applicable
- **Environment details** (React version, browser, OS)
- **Code samples** demonstrating the issue

### ✨ Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear title and description**
- **Use case** - why would this be useful?
- **Proposed solution** if you have one in mind
- **Alternative solutions** you've considered
- **Examples** from other libraries if applicable

### 📝 Improving Documentation

Documentation improvements are always welcome! This includes:

- Fixing typos or unclear explanations
- Adding more examples
- Improving API documentation
- Creating tutorials or guides
- Translating documentation

### 💻 Contributing Code

We welcome code contributions! This includes:

- Fixing bugs
- Implementing new features
- Improving performance
- Adding tests
- Refactoring code

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 20
- **pnpm** >= 9.0.0 (required - we enforce this with `only-allow`)

### Initial Setup

1. **Fork the repository** on GitHub

2. **Clone your fork** locally:

   ```bash
   git clone https://github.com/YOUR_USERNAME/react-iran-maps.git
   cd react-iran-maps
   ```

3. **Add the upstream repository**:

   ```bash
   git remote add upstream https://github.com/rezasohrabi/react-iran-maps.git
   ```

4. **Install dependencies**:

   ```bash
   pnpm install
   ```

5. **Build the project**:
   ```bash
   pnpm build
   ```

## Development Workflow

> **Note**: This project uses [Turborepo](https://turbo.build/repo) for monorepo management. **All commands should be run from the project root** - Turbo will automatically handle running tasks in the appropriate packages with intelligent caching and parallelization.

### Available Scripts

From the project root, you can run:

```bash
# Build all packages
pnpm build

# Start development mode with watch
pnpm dev

# Run linting across all packages
pnpm lint

# Type check all packages
pnpm check-types

# Format code with Prettier
pnpm format
```

### Working on the Main Package

The main library code is in `packages/react-iran-maps/`. Since this is a Turborepo, **all commands should be run from the project root** - Turbo will handle running them in the appropriate packages:

```bash
# Watch mode - rebuilds on changes across all packages
pnpm dev

# Build production bundle for all packages
pnpm build

# Run linting across all packages
pnpm lint

# Type checking across all packages
pnpm check-types
```

Turbo intelligently runs tasks only in packages that need them and caches results for faster builds.

### Testing Changes in the Dev App

The `apps/dev` directory contains a Next.js app for testing your changes:

1. **Start the dev app** (from project root):

   ```bash
   pnpm dev
   ```

   Turbo will run the dev server for both the library (in watch mode) and the Next.js app simultaneously.

2. **Open** http://localhost:3000 in your browser

3. **Test your changes** using the sample pages or create new test pages

The dev app automatically links to the local `react-iran-maps` package, so your changes will be reflected immediately thanks to Turbo's watch mode.

### Working with Samples

Sample implementations are in `apps/dev/app/samples/`. These serve as both examples and test cases:

- Each sample demonstrates a specific feature or use case
- Follow the existing pattern when adding new samples
- Update `samples/index.ts` to export new samples
- Keep samples simple and focused on one concept

## Project Structure

```
react-iran-maps/
├── apps/
│   ├── dev/              # Next.js development/testing app
│   │   ├── app/
│   │   │   ├── samples/  # Example implementations
│   │   │   └── ...
│   │   └── ...
│   └── docs/             # Docusaurus documentation site
│       └── ...
├── packages/
│   ├── react-iran-maps/  # Main library package
│   │   ├── src/
│   │   │   ├── assets/   # TopoJSON data files
│   │   │   ├── components/
│   │   │   │   ├── Breadcrumbs.tsx
│   │   │   │   ├── ChoroplethMap.tsx
│   │   │   │   ├── Legend.tsx
│   │   │   │   └── Tooltip.tsx
│   │   │   ├── data/     # Data processing utilities
│   │   │   ├── hooks/    # Custom React hooks
│   │   │   ├── lib/      # Utility functions
│   │   │   ├── types/    # TypeScript type definitions
│   │   │   └── index.tsx # Main entry point
│   │   ├── dist/         # Built files (generated)
│   │   └── package.json
│   ├── eslint-config/    # Shared ESLint configurations
│   └── typescript-config/ # Shared TypeScript configurations
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
├── README.md
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

### Key Files and Directories

- **`packages/react-iran-maps/src/components/ChoroplethMap.tsx`** - Main map component
- **`packages/react-iran-maps/src/assets/counties.json`** - TopoJSON data for Iran
- **`packages/react-iran-maps/src/hooks/`** - Custom hooks for map functionality
- **`packages/react-iran-maps/src/types/`** - TypeScript type definitions
- **`apps/dev/app/samples/`** - Example implementations and test cases

## Making Changes

### Creating a Branch

Always create a new branch for your work:

```bash
# Update your local main branch
git checkout main
git pull upstream main

# Create a new feature branch
git checkout -b feature/amazing-feature

# Or for bug fixes
git checkout -b fix/bug-description
```

### Branch Naming Convention

Use descriptive branch names with one of these prefixes:

- `feature/` - New features or enhancements
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Adding or updating tests
- `chore/` - Maintenance tasks

Examples:

- `feature/custom-markers`
- `fix/tooltip-positioning`
- `docs/improve-api-reference`

### Making Your Changes

1. **Make your changes** in your feature branch
2. **Follow the coding standards** (see below)
3. **Add or update tests** if applicable
4. **Update documentation** if you're changing functionality
5. **Test thoroughly** in the dev app

### Keeping Your Branch Updated

Regularly sync your branch with upstream:

```bash
git fetch upstream
git rebase upstream/main
```

## Testing Your Changes

### Manual Testing

1. **Start the dev app**:

   ```bash
   pnpm dev
   ```

2. **Test your changes** in various scenarios:
   - Different data types (quantitative, qualitative)
   - Different screen sizes (responsive behavior)
   - Interactive features (drill-down, hover, click)
   - Edge cases (empty data, missing values, etc.)

3. **Create a new sample** in `apps/dev/app/samples/` to demonstrate your feature

### Type Checking

Ensure there are no TypeScript errors:

```bash
pnpm check-types
```

### Linting

Run ESLint to check code quality:

```bash
pnpm lint
```

Fix linting issues automatically when possible:

```bash
# Turbo will run lint --fix across all packages
pnpm lint -- --fix
```

### Building

Ensure the package builds successfully:

```bash
pnpm build
```

## Submitting a Pull Request

### Before Submitting

- ✅ Your code follows the project's coding standards
- ✅ You've tested your changes thoroughly
- ✅ All TypeScript types are correct (`pnpm check-types` passes)
- ✅ Linting passes (`pnpm lint` passes)
- ✅ The package builds successfully (`pnpm build` passes)
- ✅ You've updated documentation if needed
- ✅ You've added samples/examples for new features
- ✅ Your commits follow the commit message guidelines

### Submitting

1. **Push your branch** to your fork:

   ```bash
   git push origin feature/amazing-feature
   ```

2. **Create a Pull Request** on GitHub:
   - Go to your fork on GitHub
   - Click "Pull Request" button
   - Select your feature branch
   - Fill out the PR template

3. **PR Title**: Use a clear, descriptive title
   - Good: "Add custom marker support with icon rendering"
   - Bad: "Update map"

4. **PR Description**: Include:
   - **What** - What changes you made
   - **Why** - Why these changes are needed
   - **How** - How you implemented the changes
   - **Testing** - How you tested the changes
   - **Screenshots** - For visual changes
   - **Related Issues** - Reference any related issues (#123)

### After Submitting

- **Respond to feedback** - Maintainers may request changes
- **Keep your PR updated** - Rebase if main branch has changed
- **Be patient** - Reviews may take time
- **Be respectful** - Follow the Code of Conduct

### PR Review Process

1. **Automated checks** run (linting, type checking, build)
2. **Maintainers review** your code
3. **Feedback** may be provided with requested changes
4. **Updates** are made based on feedback
5. **Approval** and merge once everything looks good

## Coding Standards

### TypeScript

- **Use TypeScript** for all new code
- **Define types explicitly** - avoid `any`
- **Export types** that are part of the public API
- **Use interfaces** for object shapes
- **Use type** for unions, intersections, and primitives

Example:

```typescript
// Good
interface MapProps {
  drilldown?: boolean;
  data?: ProvinceData[];
}

// Avoid
const handleClick = (data: any) => { ... }
```

### React

- **Use functional components** with hooks
- **Extract custom hooks** for reusable logic
- **Use TypeScript** for props and state
- **Avoid inline styles** - use CSS/Tailwind when possible
- **Memoize expensive calculations** with useMemo
- **Use proper dependencies** in useEffect/useMemo/useCallback

Example:

```typescript
// Good
interface TooltipProps {
  content: string;
  visible: boolean;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, visible }) => {
  return visible ? <div>{content}</div> : null;
};
```

### Code Style

- **Use ESLint** - Follow the project's ESLint configuration
- **Use Prettier** - Run `pnpm format` to format code
- **Meaningful names** - Use descriptive variable and function names
- **Keep functions small** - Each function should do one thing well
- **Comment complex logic** - Explain "why", not "what"
- **Remove console.logs** - Don't commit debugging code

### File Organization

- **One component per file** (with related types)
- **Co-locate related files** (hooks, types, utils)
- **Export from index.tsx** - Main entry point exports public API
- **Use barrel exports** - Re-export from index files

## Commit Message Guidelines

We follow a structured commit message format to maintain a clear history.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type

Use one of these types:

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, no functional change)
- **refactor**: Code refactoring (no functional change)
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Maintenance tasks, dependencies, build config

### Scope

The scope should specify the area of the change:

- **map**: Main map component
- **legend**: Legend component
- **tooltip**: Tooltip component
- **hooks**: Custom hooks
- **types**: Type definitions
- **data**: Data processing
- **docs**: Documentation
- **dev**: Dev app changes

### Subject

- Use imperative mood: "add" not "added" or "adds"
- Don't capitalize first letter
- No period at the end
- Maximum 50 characters

### Body (Optional)

- Explain what and why, not how
- Wrap at 72 characters
- Separate from subject with a blank line

### Footer (Optional)

- Reference issues: "Closes #123" or "Fixes #456"
- Note breaking changes: "BREAKING CHANGE: description"

### Examples

```
feat(map): add custom marker support

Add ability to place custom markers on the map with icons and labels.
Markers can be positioned using lat/long coordinates.

Closes #123
```

```
fix(tooltip): correct positioning on mobile devices

The tooltip was appearing off-screen on small viewports.
Now calculates available space and adjusts position accordingly.
```

```
docs(readme): update installation instructions

Add pnpm installation command and update Node.js version requirement.
```

```
refactor(hooks): extract province geometry logic

Move geometry generation logic into separate hook for better reusability.
No functional changes.
```

## Community and Support

### Getting Help

- **GitHub Issues** - Ask questions or report problems
- **Discussions** - Join conversations about features and ideas
- **Email** - Contact maintainers at rezasohrab20@gmail.com

### Staying Updated

- **Watch the repository** to get notifications
- **Star the project** to show your support
- **Follow releases** to stay informed about new versions

### Recognition

All contributors will be recognized in:

- The project's README (Contributors section)
- Release notes (when your PR is included)
- npm package (as a contributor)

## Thank You! 🙏

Your contributions make react-iran-maps better for everyone. We appreciate your time and effort in helping improve this project. Happy coding! 🚀

---

Questions? Feel free to open an issue or reach out to the maintainers.
