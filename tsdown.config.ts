import { defineConfig } from 'tsdown'

export default defineConfig([
  {
    tsconfig: 'tsconfig.lib.json',
    entry: {
      index: 'src/index.ts',
      'version-map': 'src/api/version-map.ts',
      'scheme/v1': 'src/scheme/v1/index.ts',
      transport: 'src/transport/index.ts',
    },
    outDir: 'dist',
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
    sourcemap: true,
    unbundle: true,
  },
  {
    tsconfig: 'tsconfig.lib.json',
    entry: {
      metaform: 'src/bundle.ts',
    },
    outDir: 'dist-bundle',
    format: ['esm'],
    dts: true,
    clean: true,
    sourcemap: false,
  },
])
