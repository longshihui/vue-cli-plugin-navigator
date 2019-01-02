const _ = require('lodash');
const Encryptor = require('./Encryptor');
const utils = require('./utils');
/**
 * 是否是对象
 * @param val
 * @return {boolean}
 */
function isObject(val) {
    return _.isPlainObject(val);
}

/**
 * 判断是否是字符串
 * @param val
 * @return {boolean}
 */
function isString(val) {
    return _.isString(val);
}

/**
 * 是否是空页面
 * @param pages
 * @return {boolean}
 */
function isEmptyPages(pages = {}) {
    return Object.keys(pages).keys().length === 0;
}

/**
 * 判断是否是有效的标签，string[]
 * @param tags
 * @return {boolean}
 */
function isValidTags(tags) {
    return Array.isArray(tags) && tags.length > 0 && tags.every(isString);
}

/**
 * 是否是有效的定义标签列表
 * @param defineTags
 * @return {boolean}
 */
function isValidDefineTags(defineTags) {
    return (
        Array.isArray(defineTags) &&
        defineTags.length > 0 &&
        defineTags.every(isTag)
    );
}

/**
 * 根据项目配置的页面，过滤插件配置的页面
 * @param projectPages
 * @param navigatorPages
 * @return {{}}
 */
function filterNavigatorPagesByProjectPages(projectPages, navigatorPages) {
    return Object.keys(navigatorPages)
        .filter(pageName => projectPages.hasOwnProperty(pageName))
        .reduce((result, pageName) => {
            result[pageName] = navigatorPages[pageName];
        }, {});
}

/**
 * 给页面配置添加默认值
 * @param name
 * @param pageOptions
 * @param projectPages
 * @param navigatorOptions
 */
function pageOptionsDefaulter(
    name,
    pageOptions,
    projectPages,
    navigatorOptions
) {
    let { defaults = {} } = navigatorOptions;
    if (!isValidTags(pageOptions.tags)) {
        pageOptions.tags = isValidTags(defaults.tags) ? defaults.tags : [];
    }
    if (!isString(pageOptions.description)) {
        pageOptions.description = isString(defaults.description)
            ? defaults.description
            : 'none';
    }
    pageOptions.name = name;
    pageOptions.title = isString(projectPages[name].title)
        ? projectPages[name].title
        : name;
    pageOptions.path = `${name}.html`;
}

function createPagesData(projectPages, navigatorOptions) {
    let navigatorPages = navigatorOptions.pages;
    if (
        !isObject(projectPages) ||
        isEmptyPages(projectPages) ||
        !isObject(navigatorPages) ||
        isEmptyPages(navigatorPages)
    ) {
        return {};
    }

    navigatorPages = filterNavigatorPagesByProjectPages(
        projectPages,
        navigatorPages
    );

    Object.keys(navigatorPages).forEach(pageName => {
        navigatorPages[pageName] = pageOptionsDefaulter(
            pageName,
            navigatorPages[pageName],
            projectPages,
            navigatorOptions
        );
    });

    return navigatorPages;
}

/**
 * 根据vue.config.js和项目package.json创建homepage的数据
 * @param projectOptions
 * @param projectPackageJSON
 * @return {*}
 */
module.exports = function dataCreator(projectOptions, projectPackageJSON) {
    const pluginOptions = utils.getPluginOptions(
        projectOptions,
        'navigator',
        () => ({})
    );
    let pluginData = {
        appName: projectPackageJSON.name || '',
        defineTags: isValidDefineTags(pluginOptions.defineTags)
            ? pluginOptions.defineTags
            : [],
        pages: createPagesData(projectOptions.pages, pluginOptions) || []
    };
    return Encryptor.encoding(pluginData);
};
