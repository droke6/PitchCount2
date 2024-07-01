module.exports = function(api) {
  api.cache(true);

  const presets = ['babel-preset-expo'];
  const plugins = ['@babel/plugin-transform-react-jsx']; // Add this line

  return {
    presets,
    plugins,
  };
};
