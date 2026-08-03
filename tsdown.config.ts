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
    target: 'es2020',
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
    target: 'es2020',
    platform: 'browser',
    noExternal: [/.*/],
    dts: true,
    clean: true,
    sourcemap: false,
  },
  {
    tsconfig: 'tsconfig.lib.json',
    entry: {
      metaform: 'src/bundle.ts',
    },
    outDir: 'dist-bundle-iife',
    format: ['iife'],
    globalName: 'Metaform',
    target: 'es2020',
    platform: 'browser',
    noExternal: [/.*/],
    minify: true,
    dts: false,
    clean: true,
    sourcemap: false,
  },
])
