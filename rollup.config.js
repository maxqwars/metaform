import typescriptPlugin from "rollup-plugin-typescript2";
import envFiles from "@jjldxz/rollup-plugin-env-files";

const dist = "dist";

export default {
  input: "./src/index.ts",
  plugins: [
    typescriptPlugin(),
    {
      name: "retain-import-expression",
      resolveDynamicImport(specifier) {
        if (specifier === "node-fetch") return false;
        return null;
      },
      renderDynamicImport({ targetModuleId }) {
        if (targetModuleId === "node-fetch") {
          return {
            left: "import(",
            right: ")",
          };
        }

        return undefined;
      },
    },
    envFiles({
      preventAssignment: true,
    }),
  ],
  output: [
    {
      file: `${dist}/index.js`,
      format: "cjs",
    },
    {
      file: `${dist}/index.mjs`,
      format: "esm",
    },
    {
      name: "metaform",
      file: `${dist}/index.umd.js`,
      format: "umd",
    },
  ],
};
