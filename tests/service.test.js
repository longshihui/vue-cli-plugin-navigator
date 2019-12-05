const Service = require('@vue/cli-service');
const path = require('path');
const navigatorPlugin = require('../service');

const PLUGIN_NAME = 'vue-cli-plugin-navigator';
const SPA_PROJECT_PATH = path.resolve('./tests/spa-project');
const MULTIPLE_PAGES_PROJECT_PATH = path.resolve('./tests/pages-project');

process.env.__VUE_CLI_PLUGIN_NAVIGATOR_TEST__ = true;
process.env.VUE_CLI_TEST = true;

function createService(projectPath, mode, projectOptions) {
    const service = new Service(projectPath, {
        plugins: [
            {
                id: 'inline:' + PLUGIN_NAME,
                apply: navigatorPlugin
            }
        ],
        inlineOptions: projectOptions
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
            'development',
            {
                assetsDir: './',
                pages: {
                    page1: './src/pages/page1.js',
                    page2: './src/pages/page2.js'
                }
            }
        );
        const webpackConfig = service.resolveWebpackConfig();
        expect(Object.keys(webpackConfig.entry).length).toBe(2);
        expect(PLUGIN_NAME in webpackConfig.entry).toBe(false);
    });
    test('多页模式下，插件只对development mode有效', () => {
        const service = createService(
            MULTIPLE_PAGES_PROJECT_PATH,
            'production',
            {
                publicPath: '/static',
                assetsDir: './',
                pages: {
                    page1: './src/pages/page1.js',
                    page2: './src/pages/page2.js'
                }
            }
        );
        const webpackConfig = service.resolveWebpackConfig();
        expect(Object.keys(webpackConfig.entry).length).toBe(2);
    });
});

describe('webpack dev server配置', () => {
    const projectOptions = {
        publicPath: '/static/',
        assetsDir: './',
        pages: {
            page1: './src/pages/page1.js',
            page2: './src/pages/page2.js'
        }
    };
    const service = createService(
        MULTIPLE_PAGES_PROJECT_PATH,
        'development',
        projectOptions
    );
    const webpackConfig = service.resolveWebpackConfig();
    test('index', () => {
        expect(webpackConfig.devServer.index).toBe(
            'vue-cli-plugin-navigator.html'
        );
    });
    test('openPage', () => {
        expect(webpackConfig.devServer.openPage).toBe(
            'vue-cli-plugin-navigator.html'
        );
    });
    test('historyApiFallback', () => {
        expect(webpackConfig.devServer.historyApiFallback.rewrites[0].to).toBe(
            path.resolve(
                projectOptions.publicPath,
                'vue-cli-plugin-navigator.html'
            )
        );
    });
});
