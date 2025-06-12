import globals from 'globals';

import js from '@eslint/js';
import tseslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

export default tseslint.config(
    {
        files: ['./**/*.ts', './vite.config.ts'],
        ignores: ['dist', 'node_modules'],
        extends: [js.configs.all, tseslint.configs.stylisticTypeCheckedOnly],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: 'tsconfig.json',
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
                sourceType: 'module',
            },
            globals: {
                ...globals.node
            }
        },
        plugins: {
            "@typescript-eslint": tsPlugin,
        },
        rules: {
            "prefer-const": "warn", // Encourages immutability
            "curly": "error", // Enforces braces for `if`, `while`, etc.
            "max-statements": ["error", 25],
            "no-magic-numbers": ["error", { "ignore": [0, 1, 1000] }], // Avoids magic numbers
            "no-undefined": 0, // Prevents undefined variables
            "no-undef-init": 0,
            "comma-dangle": ["error", "always-multiline"], // Enforces trailing commas for better diffs,
            "sort-imports": ["error", {
                "ignoreCase": true,
                "ignoreDeclarationSort": true,
                "ignoreMemberSort": false,
                "memberSyntaxSortOrder": ["none", "all", "multiple", "single"],
            }],
            "no-multiple-empty-lines": ["error", { max: 1 }],
            "semi": ["error", "always"],
            "quotes": ["error", "single", { "avoidEscape": true }],
            "no-console": "warn", // Warns about console usage,
            "new-cap": "off", // Enforces new for classes
            "no-inline-comments": "off", // Allows inline comments
            "one-var": "off"
        },
    },
);