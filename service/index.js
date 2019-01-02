/* eslint-disable*/
const path = require('path');
const fs = require('fs');
const HomepageDataCreator = require('../lib/HomepageDataCreator');
const OptionsDefaulter = require('../lib/OptionsDefaulter');
const utils = require('../lib/utils');

const PLUGIN_NAME = 'vue-cli-plugin-navigator';
const PLUGIN_NAMESPACE = 'navigator';
/**
 * plugin entry
 * @param api refer @vue/cli-serve PluginApi
 * @param projectOptions vue.config.js
 */
module.exports = (api, projectOptions) => {
    if (!utils.isDevelopment() || utils.isSPA(projectOptions)) return;

    const PLUGIN_DIR = process.env.__VUE_CLI_PLUGIN_NAVIGATOR_TEST__
        ? path.resolve('./')
        : './node_modules/vue-cli-plugin-navigator';
    const packageJSON = readPackageConfig();

    let pluginOptions = utils.getPluginOptions(
        projectOptions,
        PLUGIN_NAMESPACE,
        undefined
    );
    pluginOptions = OptionsDefaulter(
        projectOptions,
        packageJSON,
        pluginOptions
    );

    api.chainWebpack(config => {
        // add navigator entry
        // replace original vue-cli config
        config
            .entry(PLUGIN_NAME)
            .add('vue')
            .add(resolve('./dist/homepage.js'))
            .end();
        // add navigator entry html
        config.plugin(PLUGIN_NAME).use(require('html-webpack-plugin'), [
            {
                meta: {
                    navigator: HomepageDataCreator(
                        projectOptions,
                        pluginOptions
                    )
                },
                filename: `${PLUGIN_NAME}.html`,
                favicon: resolve('./public/favicon.ico'),
                title: packageJSON.name,
                template: resolve('./public/index.html'),
                chunks: [PLUGIN_NAME]
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

    function readPackageConfig() {
        let packageConfig = fs.readFileSync(api.resolve('package.json'), {
            encoding: 'utf-8'
        });
        if (packageConfig) {
            packageConfig = JSON.parse(packageConfig);
        } else {
            packageConfig = {};
        }
        return packageConfig;
    }

    function resolve(path) {
        return api.resolve(require('path').posix.join(PLUGIN_DIR, path));
    }
};