module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'plugin:import/recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: ['prettier', 'react', 'import'],
  rules: {
    'no-restricted-exports': [
      'error',
      { restrictDefaultExports: { defaultFrom: false } },
    ],
    'no-trailing-spaces': 2,
    'import/no-extraneous-dependencies': [2, { devDependencies: true }],
    'import/extensions': [
      2,
      {
        ignorePackages: true,
        pattern: {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
          json: 'never',
        },
      },
    ],
    'react/no-unknown-property': [2, { ignore: ['css'] }],
    'react/jsx-filename-extension': [2, { extensions: ['.tsx', '.jsx'] }],
    'prettier/prettier': 2,
    'jsx-a11y/control-has-associated-label': [
      2,
      {
        ignoreElements: ['td'],
      },
    ],
    '@typescript-eslint/no-misused-promises': [2, { checksVoidReturn: false }],
    '@typescript-eslint/no-unused-vars': 2,
    'consistent-return': 2,
    'no-shadow': 0,
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-floating-promises': 0,
    'newline-before-return': 2,
    'import/prefer-default-export': 0,
    'react/react-in-jsx-scope': 0,
    'react/jsx-props-no-spreading': 0,
    '@typescript-eslint/no-shadow': 0
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
      node: {
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
};
