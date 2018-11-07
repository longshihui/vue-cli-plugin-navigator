const Service = require('@vue/cli-service');
const path = require('path');
const navigatorPlugin = require('../lib/vue-cli-plugin');

const PLUGIN_NAME = 'vue-cli-plugin-navigator';
const SPA_PROJECT_PATH = path.resolve('./tests/spa-project');
const MULTIPLE_PAGES_PROJECT_PATH = path.resolve('./tests/pages-project');

process.env.__VUE_CLI_PLUGIN_NAVIGATOR_TEST__ = true;
process.env.VUE_CLI_TEST = true;

function createService(projectPath, mode) {
    const service = new Service(projectPath, {
        plugins: [
            {
                id: 'inline:' + PLUGIN_NAME,
                apply: navigatorPlugin
            }
        ]
    });
    service.init(mode);
    return service;
}

describe('插件生效灰度测试', () => {
    test('单页模式下忽略本插件', () => {
        const service = createService(SPA_PROJECT_PATH, 'development');
        const webpackConfig = service.resolveWebpackConfig();
        expect(Object.keys(webpackConfig.entry).length).toBe(1);
    });
    test('多页模式下，插件生效', () => {
        const service = createService(
            MULTIPLE_PAGES_PROJECT_PATH,
            'development'
        );
        const webpackConfig = service.resolveWebpackConfig();
        expect(Object.keys(webpackConfig.entry).length).toBe(3);
        expect(PLUGIN_NAME in webpackConfig.entry).toBe(true);
    });
    test('多页模式下，插件只对development mode有效', () => {
        const service = createService(
            MULTIPLE_PAGES_PROJECT_PATH,
            'production'
        );
        const webpackConfig = service.resolveWebpackConfig();
        expect(Object.keys(webpackConfig.entry).length).toBe(2);
    });
});
