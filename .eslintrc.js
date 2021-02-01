module.exports = {
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'function-paren-newline': ['error', 'consistent'],
    'import/prefer-default-export': 0,
  },
};
