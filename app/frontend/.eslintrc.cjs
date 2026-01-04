module.exports = {
  extends: ['plugin:@web-bee-ru/base', 'plugin:@web-bee-ru/react', '../../.eslintrc.cjs'],
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '^(.*Enum)$',
      },
    ],
  },
};
