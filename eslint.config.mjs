const eslintConfig = [
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "dist/**"]
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    rules: {
      // Basic rules for Next.js
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off"
    }
  }
];

export default eslintConfig;
