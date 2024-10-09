module.exports = {
  env: {
    node: true,
    es2021: true, 
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module', 
  },
  extends: [
    'eslint:recommended',
    'google',
  ],
  rules: {
    'no-restricted-globals': ['error', 'name', 'length'],
    'prefer-arrow-callback': 'error',
    'quotes': ['error', 'double', { allowTemplateLiterals: true }],
  },
  globals: {
    require: 'readonly',
    process: 'readonly',
    __dirname: 'readonly',
    module: 'readonly',
    exports: 'readonly',
  },
};