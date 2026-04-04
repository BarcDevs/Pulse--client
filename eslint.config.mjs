import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh'
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

import { FlatCompat } from '@eslint/eslintrc'
import eslintPluginTypescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import js from '@eslint/js'
import enforceObjectBreaking from './eslint-rules/enforce-object-breaking.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended
})

const config = [
    {
        ignores: [
            'node_modules',
            'dist',
            '.next',
            '.idea',
            'eslint.config.mjs',
            'postcss.config.mjs',
            'next.config.ts',
            'next-env.d.ts',
            '**/*.yml',
            '**/*.yaml'
        ]
    },

    ...compat.extends(
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended'
    ),

    {
        languageOptions: {
            parser: typescriptParser,
            ecmaVersion: 2020,
            sourceType: 'module',
            globals: {
                browser: true,
                es2020: true,
                node: true
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                },
                warnOnUnsupportedTypeScriptVersion: false
            }
        },
        plugins: {
            '@typescript-eslint': eslintPluginTypescript,
            react: eslintPluginReact,
            'react-hooks': eslintPluginReactHooks,
            'react-refresh': eslintPluginReactRefresh,
            'simple-import-sort': eslintPluginSimpleImportSort,
            'custom-rules': {
                rules: {
                    'enforce-object-breaking': enforceObjectBreaking
                }
            }
        },
        rules: {
            'no-empty-pattern': 'off',
            'react-refresh/only-export-components': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/ban-ts-comment': 'off',
            'react/react-in-jsx-scope': 'off',
            '@typescript-eslint/no-unused-expressions': 'error',
            'no-console': [
                'warn',
                { allow: ['warn', 'error'] }
            ],
            'react/no-unescaped-entities': 'off',
            'react/prop-types': 'off',
            'react/self-closing-comp': 'warn',
            'react/display-name': 'off',
            semi: ['warn', 'never'],
            quotes: ['warn',
                'single', {
                    avoidEscape: true,
                    allowTemplateLiterals: true
                }],
            'object-curly-spacing': ['warn', 'always'],
            'operator-linebreak': [
                'warn',
                'before',
                { overrides: { '=': 'after' } }
            ],
            'simple-import-sort/imports': [
                'warn',
                {
                    groups: [
                        // 1. React (always first)
                        ['^react$', '^react-dom$'],

                        // 2. Next.js
                        ['^next'],

                        // 3. Third-party packages
                        ['^[^@.]'],

                        // 4. @-scoped third-party packages
                        ['^@(?!/)'],

                        // 5. Custom @/ imports (grouped by subdirectory)
                        ['^@/types'],
                        ['^@/components'],
                        ['^@/hooks'],
                        ['^@/lib'],
                        ['^@/utils'],
                        ['^@/services'],
                        ['^@/constants'],
                        ['^@/config'],
                        ['^@/context'],
                        ['^@/handlers'],
                        ['^@/'],

                        // 6. Relative imports (parent directories)
                        ['^\\.\\.(?!/?$)', '^\\.\\./'],

                        // 7. Relative imports (same directory)
                        ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],

                        // 8. Side effect imports
                        ['^\\u0000'],

                        // 9. Style imports (always last)
                        ['^.+\\.css$']
                    ]
                }
            ],
            'simple-import-sort/exports': 'warn',
            'custom-rules/enforce-object-breaking': 'warn'
        }
    },

    // shadcn/ui components - totally disable ESLint checks
    {
        ignores: ['src/components/ui/**']
    }
]

export default config
