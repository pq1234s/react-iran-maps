import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.tsx"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: false,
  minify: true,
  clean: true,
  external: ["react", "react-dom", "react/jsx-runtime"],
  treeshake: true,
  banner: {
    js: `"use client";`,
  },
});
