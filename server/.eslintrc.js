module.exports = {
  extends: [
    'airbnb',
    'plugin:prettier/recommended',
    'prettier/babel',
    'prettier/react'
  ],
  env: {
    browser: true,
    node: true,
    commonjs: true
  },
  plugins: ['react-hooks'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  }
}
