module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    extends: [
        'plugin:@next/next/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
    ],
    plugins: ['import-quotes'],
    rules: {
        'import-quotes/import-quotes': [2, 'single'], // or double
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
