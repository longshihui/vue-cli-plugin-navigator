const get = require('lodash.get');

function isValidPageConfig(config) {
    return (
        config &&
        Object.prototype.toString.call(config).toLowerCase() ===
            '[object object]' &&
        Object.keys(config).length > 0
    );
}

function createPageData(pagesConfig) {
    if (!isValidPageConfig(pagesConfig)) return;
    return Object.keys(pagesConfig).map(entryName => {
        const pageConfig = pagesConfig[entryName];

        const config = {
            name: entryName,
            title: entryName,
            path: `${entryName}.html`,
            tags: [],
            description: ''
        };

        if (typeof pageConfig === 'string') {
            return config;
        }

        if (typeof pageConfig === 'object') {
            return Object.assign(config, {
                title: pageConfig.title || entryName,
                path: pageConfig.filename
                    ? '/' + pageConfig.filename
                    : `/${entryName}.html`,
                tags: pageConfig.tags,
                description: pageConfig.description
            });
        }

        return config;
    });
}

// create plugin data by user vue config
module.exports = function createPluginData(projectOptions, appName) {
    const pluginOptions = get(projectOptions, 'pluginOptions.navigator', {});
    let pluginData = {
        appName: appName || '',
        defineTags: pluginOptions.defineTags || [],
        pages: createPageData(projectOptions.pages) || []
    };
    return encodeURIComponent(JSON.stringify(pluginData));
};
