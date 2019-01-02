const Mock = require('mockjs');
const HomepageDataCreator = require('./HomepageDataCreator');
const OptionsDefaulter = require('./OptionsDefaulter');

function mockProjectPages() {
    const wrap = Mock.mock({
        'pages|3-20': [
            {
                name: /[a-zA-Z]{5,10}/,
                path: ''
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
    return Mock.mock({
        'tags|3-10': [
            {
                name: /[a-zA-Z]{5,10}/,
                color: () => Mock.Random.color()
            }
        ]
    }).tags;
}

function mockPageTags(defineTags) {
    const hasTagCount = parseInt(Math.random() * defineTags.length);
    return defineTags.slice(0, hasTagCount).map(tag => tag.name);
}

function mockPageDescription() {
    return Mock.Random.paragraph();
}

function mockPluginPages(pages, defineTags) {
    pages = Object.keys(pages);
    let pagesOptions = {};
    for (let pageName of pages) {
        pagesOptions[pageName] = {
            tags: mockPageTags(defineTags),
            description: mockPageDescription()
        };
    }
    return pagesOptions;
}

module.exports = function() {
    const mockPackageJSON = {
        name: 'test app'
    };
    let mockVueConfig = {
        pages: mockProjectPages(),
        pluginOptions: {}
    };
    const defineTags = mockDefineTags();
    let pluginOptions = OptionsDefaulter(mockVueConfig, mockPackageJSON, {
        defineTags,
        pages: mockPluginPages(mockVueConfig.pages, defineTags)
    });
    return HomepageDataCreator(mockVueConfig, pluginOptions);
};
