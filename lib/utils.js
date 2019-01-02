const _ = require('lodash');

module.exports = {
    /**
     * 判断是否是单页应用
     * @param projectOptions
     * @return {boolean}
     */
    isSPA(projectOptions) {
        return (
            !_.isPlainObject(projectOptions.pages) ||
            Object.keys(projectOptions.pages).length === 0
        );
    },
    /**
     * 获取插件配置信息
     * @param {object} projectOptions
     * @param {string} namespace
     * @param {object} defaultValue
     * @return {*}
     */
    getPluginOptions(projectOptions, namespace, defaultValue) {
        return _.get(
            projectOptions,
            'pluginOptions.' + namespace,
            defaultValue
        );
    }
};
