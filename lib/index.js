/* eslint-disable*/

module.exports = (api, projectOptions) => {
  if (projectOptions.pages && typeof projectOptions.pages === 'object') {
    const resolve = (path) => api.resolve(require('path').posix.join('node_modules/vue-cli-plugin-navigator', path));
    const pagesConfig = projectOptions.pages;
    const navigatorData = Object.keys(pagesConfig).map(entryName => {
      const pageConfig = pagesConfig[entryName];
      
      const defaults = {
        title: entryName,
        path: `${entryName}.html`
      };
      
      if (typeof pageConfig === 'string') {
        return defaults
      }
      
      if (typeof pageConfig === 'object') {
        return {
          title: pageConfig.title || entryName,
          path: pageConfig.filename ? '/' + pageConfig.filename : `/${entryName}.html`
        }
      }
      
      return defaults;
    });
    
    api.chainWebpack((config) => {
      
      config.entry('__navigator__')
        .add('vue')
        .add(resolve('./dist/navigator.css'))
        .add(resolve('./dist/navigator.umd.js'))
        .end();
      
      config.devServer.set('index', '__navigator__.html');
      config.devServer.openPage('__navigator__.html');
      
      config.devServer.historyApiFallback({
        rewrites: [
          { from: /./, to: require('path').posix.join(projectOptions.baseUrl, '__navigator__.html') }
        ]
      });
      
      config
        .plugin('__navigator__html')
        .use(require(resolve('node_modules/html-webpack-plugin')), [{
          templateParameters: {
            __NAVIGATOR_PAGES_CONFIG__: JSON.stringify(navigatorData)
          },
          filename: '__navigator__.html',
          title: '多页面导航页',
          template: resolve('./public/index.html'),
          chunks: ['__navigator__']
        }]);
    });
  }
};
