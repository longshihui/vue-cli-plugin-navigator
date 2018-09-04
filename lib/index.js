/* eslint-disable*/
const createNavigatorData = require('./utils/createNavigatorData');
module.exports.defaultModes = {
  serve: 'development'
};
/**
 * plugin entry
 * @param api refer @vue/cli-serve PluginApi
 * @param projectOptions vue.config.js
 */
module.exports = (api, projectOptions) => {
  if (process.env.NODE_ENV !== 'development') return;
  
  const pagesConfig = projectOptions.pages;
  if (pagesConfig && typeof pagesConfig === 'object' && Object.keys(pagesConfig).length) {
    const resolve = (path) => api.resolve(require('path').posix.join('node_modules/vue-cli-plugin-navigator', path));
    const navigatorData = createNavigatorData(projectOptions.pages);
    
    api.chainWebpack((config) => {
      // add navigator entry
      // replace original vue-cli config
      config.entry('__navigator__')
        .add('vue')
        .add(resolve('./dist/navigator-index.js'))
        .end();
      // add navigator entry html
      config
        .plugin('__navigator__html')
        .use(require(resolve('node_modules/html-webpack-plugin')), [{
          meta: {
            navigator: navigatorData
          },
          filename: '__navigator__.html',
          favicon: resolve('./public/favicon.ico'),
          title: 'welcome to navigator center',
          template: resolve('./public/index.html'),
          chunks: ['__navigator__']
        }]);
      // refer the index page to plugin index
      config.devServer.set('index', '__navigator__.html');
      // default open plugin index when user config devServer.open = true
      config.devServer.openPage('__navigator__.html');
      // rewrite devServer history fallback page to plugin index
      config.devServer.historyApiFallback({
        rewrites: [
          { from: /./, to: require('path').posix.join(projectOptions.baseUrl, '__navigator__.html') }
        ]
      });
      Object.keys(pagesConfig).forEach(function (pageKey) {
        // add navigator-float plugin to user config page
        config.entry(pageKey).add(resolve('./dist/navigator-float.js'));
        // inject navigator-float need data to meta tag
        config
          .plugin('html-' + pageKey)
          .tap((options) => {
            options.forEach((options) => {
              options.meta = Object.assign(options.meta || {}, {
                navigator: navigatorData
              })
            });
            return options;
          });
      });
    });
  }
};
