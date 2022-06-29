module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['airbnb-base', 'airbnb-typescript/base'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    parserOptions: {
        project: './tsconfig.json',
    },
    plugins: ['@typescript-eslint'],
    rules: {
        semi: 'off',
        indent: 'off',
        '@typescript-eslint/indent': ['error', 4],
        '@typescript-eslint/semi': ['error', 'never'],
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                ts: 'never',
            },
        ],
        '@typescript-eslint/comma-dangle': 'off',
        '@typescript-eslint/lines-between-class-members': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        'import/prefer-default-export': 'off',
        'implicit-arrow-linebreak': 'off',
        'class-methods-use-this': 'off',
    },
    settings: {
        'import/resolver': {
            typescript: {},
        },
    },
}
