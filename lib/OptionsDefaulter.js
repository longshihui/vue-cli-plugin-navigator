const _ = require('lodash');

const Defaulter = {
    title(pluginOptions, packageJSON) {
        const title = _.get(pluginOptions, 'title', undefined);
        return _.isString(title)
            ? title
            : `welcome to ${packageJSON.name || 'homepage'}`;
    },
    defineTags(pluginOptions) {
        const defineTags = _.get(pluginOptions, 'defineTags', []);
        if (!Array.isArray(defineTags)) {
            return [];
        }
        /**
         * 是否是个标签
         * @param tag
         * @return {boolean}
         */
        function isTag(tag) {
            return (
                _.isPlainObject(tag) &&
                tag.hasOwnProperty('name') &&
                tag.hasOwnProperty('color') &&
                _.isString(tag.name) &&
                _.isString(tag.color)
            );
        }
        return defineTags.filter(isTag);
    },
    defaultsTags(pluginOptions) {
        const tags = _.get(pluginOptions, 'defaults.tags', []);
        if (!Array.isArray(tags)) {
            return [];
        }
        return tags.filter(_.isString);
    },
    defaultsDescription(pluginOptions) {
        const description = _.get(
            pluginOptions,
            'defaults.description',
            'none'
        );
        if (!_.isString(description)) {
            return 'none';
        }
        return description;
    },
    pages(projectOptions, pluginOptions, defaults) {
        const pages = projectOptions.pages;
        const pagesConfig = _.get(pluginOptions, 'pages', null);
        /**
         * 页面配置默认值
         * @param pageName
         */
        function defaulter(pageName) {
            let tags = defaults.tags;
            let description = defaults.description;
            if (
                _.isPlainObject(pagesConfig) &&
                pagesConfig.hasOwnProperty(pageName) &&
                _.isPlainObject(pagesConfig[pageName])
            ) {
                const pageConfig = pagesConfig[pageName];
                if (Array.isArray(pageConfig.tags)) {
                    tags = pageConfig.tags;
                }
                if (_.isString(pageConfig.description)) {
                    description = pageConfig.description;
                }
            }
            return {
                name: pageName,
                tags: tags.filter(_.isString),
                description: _.isString(description) ? description : 'none'
            };
        }

        /**
         * 创建配置项
         * @param pagesOptions
         * @param pageConfig
         * @return {*}
         */
        function createOptions(pagesOptions, pageConfig) {
            pagesOptions[pageConfig.name] = pageConfig;
            delete pageConfig.name;
            return pagesOptions;
        }

        return Object.keys(pages)
            .map(defaulter)
            .reduce(createOptions, {});
    }
};

module.exports = function(projectOptions, packageJSON, pluginOptions) {
    const defineTags = Defaulter.defineTags(pluginOptions);
    const defaults = {
        tags: Defaulter.defaultsTags(pluginOptions),
        description: Defaulter.defaultsDescription(pluginOptions)
    };
    return {
        // 标题
        title: Defaulter.title(pluginOptions, packageJSON),
        // 定义的标签
        defineTags,
        // 每一个页面配置的默认值
        defaults,
        // 页面配置
        pages: Defaulter.pages(projectOptions, pluginOptions, defaults)
    };
};
