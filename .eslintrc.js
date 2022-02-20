module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'linebreak-style': 'off',
    'no-undef': 'off',
    'no-use-before-define': 'off',
    'no-case-declarations': 'off',
    'consistent-return': 'off',
    'max-len': 'off',
    'no-alert': 'off',
    'import/prefer-default-export': 'off',
    'lines-between-class-members': 'off',
    indent: ['error', 2],
    eqeqeq: 'off',
    'no-mixed-operators': [
      'error', { allowSamePrecedence: true },
    ],
    'class-methods-use-this': 'off',
    'max-classes-per-file': 'off',
    'no-param-reassign': ['error', { props: false }],
    'no-return-assign': ['error', 'except-parens'],
    'no-lonely-if': 'off',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-unused-vars': ['error', { args: 'none' }],
  },
};
