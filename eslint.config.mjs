// `next lint` was removed in Next.js 16, and ESLint 10 dropped the .eslintrc
// compatibility layer, so eslint-config-next's flat config is used directly.
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

export default [
  {
    ignores: [".next/**", "out/**", "node_modules/**", "public/**", "next-env.d.ts"],
  },
  ...nextCoreWebVitals,
];
