const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  // some configuration
  assetPrefix: process.env.NODE_ENV === 'production' ? '/learn-pianotype' : '',
  // another configuration
});
