/* eslint-disable*/
const createPluginData = require('./createPluginData');
const PLUGIN_NAME:string = 'vue-cli-plugin-navigator';
/**
 * plugin entry
 * @param api refer @vue/cli-serve PluginApi
 * @param projectOptions vue.config.js
 */
module.exports = (api: any, projectOptions: any) => {
  if (process.env.NODE_ENV !== 'development') return;

  const pagesConfig = projectOptions.pages;
  if (
    pagesConfig &&
    typeof pagesConfig === 'object' &&
    Object.keys(pagesConfig).length
  ) {
    const resolve = (path: string) =>
      api.resolve(
        require('path').posix.join(
          'node_modules/vue-cli-plugin-navigator',
          path
        )
      );
    const navigatorData = createPluginData(projectOptions);

    api.chainWebpack((config: any) => {
      // add navigator entry
      // replace original vue-cli config
      config
        .entry(PLUGIN_NAME)
        .add('vue')
        .add(resolve('./dist/navigator-index.js'))
        .end();
      // add navigator entry html
      config
        .plugin(PLUGIN_NAME)
        .use(require(resolve('node_modules/html-webpack-plugin')), [
          {
            meta: {
              navigator: navigatorData
            },
            filename: `${PLUGIN_NAME}.html`,
            favicon: resolve('./public/favicon.ico'),
            title: 'welcome to navigator center',
            template: resolve('./public/index.html'),
            chunks: ['__navigator__']
          }
        ]);
      // refer the index page to plugin index
      config.devServer.set('index', `${PLUGIN_NAME}.html`);
      // default open plugin index when user config devServer.open = true
      config.devServer.openPage(`${PLUGIN_NAME}.html`);
      // rewrite devServer history fallback page to plugin index
      config.devServer.historyApiFallback({
        rewrites: [
          {
            from: /./,
            to: require('path').posix.join(
              projectOptions.baseUrl,
              `${PLUGIN_NAME}.html`
            )
          }
        ]
      });
    });
  }
};

module.exports.defaultModes = {
  serve: 'development'
};
