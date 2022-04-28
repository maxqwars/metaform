import typescriptPlugin from 'rollup-plugin-typescript2';

const dist = 'dist';

export default {
  input: './src/index.ts',
  plugins: [typescriptPlugin()],
  output: [
    {
      file: `${dist}/index.cjs.js`,
      format: 'cjs',
    },
    {
      file: `${dist}/index.esm.js`,
      format: 'esm',
    },
    {
      name: 'metaform',
      file: `${dist}/index.umd.js`,
      format: 'umd',
    },
  ],
};
