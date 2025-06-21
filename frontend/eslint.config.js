import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      importPlugin.flatConfigs.recommended
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx']
      },
      "import/resolver": {
        "alias": {
          "map": [
            ["@api", "./src/api"],
            ["@atoms", "./src/atoms"],
            ["@assets", "./src/assets"],
            ["@components", "./src/components"],
            ["@layouts", "./src/layouts"],
            ["@pages", "./src/pages"],
            ["@services", "./src/services"],
            ["@utils", "./src/utils"],
          ],
          "extensions": [".ts", ".tsx", ".json"] // Add extensions if needed
        }
      }
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      "prefer-const": "warn", // Encourages immutability
      "curly": "error", // Enforces braces for `if`, `while`, etc.
      "max-statements": ["error", 250],
      "max-lines-per-function": ["error", { max: 250, skipBlankLines: true, skipComments: true }], // Limits file size
      "no-undefined": 0, // Prevents undefined variables
      "no-undef-init": 0,
      "comma-dangle": ["error", "always-multiline"], // Enforces trailing commas for better diffs,
      "no-multiple-empty-lines": ["error", { max: 1 }],
      "semi": ["error", "always"],
      "quotes": ["error", "single", { "avoidEscape": true }],
      "no-console": "warn", // Warns about console usage,
      "new-cap": "off", // Enforces new for classes
      "no-inline-comments": "off", // Allows inline comments
      "one-var": "off",
      "no-useless-return": "off",
      "consistent-return": "off",
      "import/order":
      [
        'error',
        {
          "groups":
            [
              "builtin",
              "external",
              "internal",
              "sibling",
              "parent",
              "index"
            ],
        }
      ] 
    }
  },
)
