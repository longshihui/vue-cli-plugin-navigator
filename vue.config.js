const mockNavigatorData = require('./lib/utils/mockNavigatorData');

module.exports = {
  devServer: {
    open: true
  },
  pages: {
    index: './src/navigator-index/main.ts',
    float: './src/navigator-float/main.ts'
  },
  productionSourceMap: false,
  chainWebpack: config => {
    const pages = ['index', 'float'];
    if (process.env.NODE_ENV === 'development') {
      pages.forEach(pageName => {
        config.plugin('html-' + pageName).tap(htmlWebpackPluginOptionsArr => {
          htmlWebpackPluginOptionsArr.forEach(options => {
            options.meta = Object.assign(options.meta || {}, {
              navigator: mockNavigatorData()
            });
          });
          return htmlWebpackPluginOptionsArr;
        });
      });
    }
  }
};
