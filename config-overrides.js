const {injectBabelPlugin} = require('react-app-rewired');

// Override webpack configurations from create-react-app
module.exports = function override(config) {
  // Add decorator support (for decko)
  const plugins = ['transform-decorators-legacy'];
  config = injectBabelPlugin(plugins, config);
  // Target electron
  config.target = 'electron-renderer';

  return config;
};