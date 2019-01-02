const Mock = require('mockjs');
const createHomepageDataByVueConfig = require('./HomepageDataCreator');
const packageConfig = require('../package.json');

function mockProjectPages() {
    const wrap = Mock.mock({
        'pages|3-20': [
            {
                name: /[a-zA-Z]{5,10}/,
                path: '',
                tags: mockPageTags,
                description: () => Mock.Random.paragraph(10, 20)
            }
        ]
    });

    wrap.pages.forEach(pageConfig => {
        pageConfig.path = './src' + pageConfig.name + '.js';
    });

    return wrap.pages.reduce(function(pages, pageConfig) {
        pages[pageConfig.name] = {
            entry: pageConfig.path
        };
        return pages;
    }, {});
}

function mockDefineTags() {
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

function mockPageTags(defineTags) {
    const hasTagCount = parseInt(Math.random() * defineTags.length);
    return defineTags.slice(0, hasTagCount).map(tag => tag.name);
}

module.exports = function() {
    let vueConfig = {
        pages: null,
        pluginOptions: {
            navigator: null
        }
    };
    vueConfig.pages = mockProjectPages();
    vueConfig.pluginOptions.navigator = {
        defineTags: mockDefineTags(),
        pages: mock
    };
    return createHomepageDataByVueConfig(mockVueConfig, packageConfig.name);
};
