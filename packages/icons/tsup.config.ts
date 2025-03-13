import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ['react', 'react-icons', '@phosphor-icons/react', '@radix-ui/react-icons'],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
  },
});
