module.exports = {
    parser: '@typescript-eslint/parser',
    root: true, // Make sure eslint picks up the config at the root of the directory
    parserOptions: {
        ecmaVersion: 2020, // Use the latest ecmascript standard
        sourceType: 'module', // Allows using import/export statements
        ecmaFeatures: {
            jsx: true, // Enable JSX since we're using React
        },
    },
    settings: {
        react: {
            version: 'detect', // Automatically detect the react version
        },
    },
    env: {
        browser: true, // Enables browser globals like window and document
        amd: true, // Enables require() and define() as global variables as per the amd spec.
        node: true, // Enables Node.js global variables and Node.js scoping.
        jest: true,
    },
    plugins: ['simple-import-sort', 'import', 'prettier'],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jest/style',
        'plugin:cypress/recommended',
        'plugin:prettier/recommended', // Make this the last element so prettier config overrides other formatting rules
    ],
    rules: {
        'import/prefer-default-export': 2,
        'react/react-in-jsx-scope': 0,
        'react/prop-types': 0,
        '@typescript-eslint/ban-ts-comment': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-explicit-any': 2,
        'simple-import-sort/imports': 2,
        'simple-import-sort/exports': 2,
        'jsx-a11y/anchor-is-valid': 2,
        'jest/no-disabled-tests': 1,
        'jest/no-focused-tests': 2,
        'jest/no-identical-title': 2,
        'jest/prefer-to-have-length': 1,
        'jest/valid-expect': 2,
    },
};
