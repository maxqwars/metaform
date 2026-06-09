import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: [
        'src/bundle.ts',
        'src/index.ts',
        'src/**/index.ts',
        'src/**/types.ts',
        'src/api/version-map.ts',
      ],
      reporter: ['text', 'html', 'lcov'],
    },
  },
})
