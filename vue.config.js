const mockNavigatorData = require('./lib/mockPluginData');

module.exports = {
    devServer: {
        open: true
    },
    pages: {
        index: './src/packages/homepage/main.ts'
    },
    productionSourceMap: false,
    chainWebpack: config => {
        const pages = ['index'];
        if (process.env.NODE_ENV === 'development') {
            pages.forEach(pageName => {
                config
                    .plugin('html-' + pageName)
                    .tap(htmlWebpackPluginOptionsArr => {
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
