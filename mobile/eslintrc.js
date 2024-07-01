module.exports = {
    root: true,
    extends: '@react-native-community',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    env: {
      jest: true,
      browser: true,
      node: true,
    },
    rules: {
      // Your custom rules here
    },
  };
  