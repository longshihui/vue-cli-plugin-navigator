const _ = require('lodash');
const Encryptor = require('./Encryptor');

/**
 * 给页面配置添加默认值
 * @param name
 * @param pageOptions
 * @param projectPages
 * @param navigatorOptions
 */
function getPageSpecialConfig(name, pageOptions, projectPages) {
    let data = {
        name,
        tags: pageOptions.tags,
        description: pageOptions.description,
        title: name,
        path: `/${name}.html`
    };
    if (_.isString(projectPages[name].title)) {
        data.title = projectPages[name].title;
    }
    if (_.isString(projectPages[name].filename)) {
        data.path = `/${projectPages[name].filename}`;
    }
    return data;
}

function createPagesData(projectPages, pluginOptions) {
    let pages = pluginOptions.pages;
    return Object.keys(pages).map(pageName =>
        getPageSpecialConfig(pageName, pages[pageName], projectPages)
    );
}

/**
 * 根据vue.config.js和项目package.json创建homepage的数据
 * @param projectOptions
 * @param pluginOptions
 * @return {*}
 */
module.exports = function dataCreator(projectOptions, pluginOptions) {
    let data = {
        title: pluginOptions.title,
        defineTags: pluginOptions.defineTags,
        pages: createPagesData(projectOptions.pages, pluginOptions)
    };
    return Encryptor.encoding(data);
};
