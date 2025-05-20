// webpack.config.js
// Custom Expo Webpack configuration to alias React Native's asset registry

// Import the default Expo Webpack config creator
const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  // Generate the default config
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Alias the missing asset registry module to Expo's implementation
  config.resolve.alias = {
    ...config.resolve.alias,
    // Alias React Native's asset registry to React Native Web's implementation
    '@react-native/assets-registry/registry': require.resolve('react-native-web/dist/modules/AssetRegistry'),
  };

  return config;
};
