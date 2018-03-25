const {injectBabelPlugin} = require('react-app-rewired');

// Override webpack configurations from create-react-app
module.exports = function override(config) {
  // Target electron
  config.target = 'electron-renderer';

  return config;
};