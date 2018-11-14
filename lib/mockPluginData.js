const Mock = require('mockjs');
const createPluginData = require('./createPluginData');
const packageConfig = require('../package.json');

function mockPluginOptions() {
    const mockTags = Mock.mock({
        'tags|3-10': [
            {
                name: /[a-zA-Z]{5,10}/,
                color: () => Mock.Random.color()
            }
        ]
    }).tags;
    return {
        defineTags: mockTags
    };
}

function mockPagesConfig(pluginOptions) {
    const tags = pluginOptions.defineTags;
    function mockPageTags() {
        const hasTagCount = parseInt(Math.random() * tags.length);
        return tags.slice(0, hasTagCount).map(tag => tag.name);
    }
    const config = Mock.mock({
        'pages|3-20': [
            {
                name: /[a-zA-Z]{5,10}/,
                path: '',
                tags: mockPageTags,
                description: () => Mock.Random.paragraph(10, 20)
            }
        ]
    });

    config.pages.forEach(pageConfig => {
        pageConfig.path = './src' + pageConfig.name + '.js';
    });

    return config.pages.reduce(function(pages, pageConfig) {
        pages[pageConfig.name] = {
            entry: pageConfig.path,
            tags: pageConfig.tags,
            description: pageConfig.description
        };
        return pages;
    }, {});
}

module.exports = function() {
    let mockVueConfig = {
        pluginOptions: {}
    };
    mockVueConfig.pluginOptions.navigator = mockPluginOptions();
    mockVueConfig.pages = mockPagesConfig(
        mockVueConfig.pluginOptions.navigator
    );
    return createPluginData(mockVueConfig, packageConfig.name);
};
