import { defineConfig, Options } from "tsup";

export default defineConfig((options: Options) => ({
  entry: ["src/index.tsx"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: false,
  silent: false,
  minify: !options.watch,
  clean: !options.watch,
  external: ["react", "react-dom", "react/jsx-runtime"],
  treeshake: !options.watch,
  define: {
    "process.env.NODE_ENV": '"production"',
  },
  esbuildOptions(options) {
    options.drop = ["console", "debugger"];
    options.legalComments = "none";
  },
  banner: {
    js: `"use client";`,
  },
}));
