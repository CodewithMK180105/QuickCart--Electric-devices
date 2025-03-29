import next from "@next/eslint-plugin-next";

export default [
  {
    plugins: {
      "@next/next": next, // Correctly register the Next.js ESLint plugin
    },
    rules: {
      ...next.configs.recommended.rules, // Apply the recommended Next.js rules
    },
  },
];
