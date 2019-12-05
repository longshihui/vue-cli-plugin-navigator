<a name="2.1.0"></a>

# [2.1.0](https://github.com/longshihui/vue-cli-plugin-navigator/compare/v2.0.3...v2.1.0) (2019-12-05)

### Bug Fixes

-   修复因 webpack splitChunks 的 cacheGroups 分离出本插件代码导致无法正常运行的问题 ([bc80e7b](https://github.com/longshihui/vue-cli-plugin-navigator/commit/bc80e7b))

### Features

-   **service:** update PLUGIN_DIR resolve method ([86ce30f](https://github.com/longshihui/vue-cli-plugin-navigator/commit/86ce30f))
-   新增对 filename 的支持 close [#11](https://github.com/longshihui/vue-cli-plugin-navigator/issues/11) ([f2e754c](https://github.com/longshihui/vue-cli-plugin-navigator/commit/f2e754c))

<a name="2.0.3"></a>

## [2.0.3](https://github.com/longshihui/vue-cli-plugin-navigator/compare/v1.3.1...v2.0.3) (2019-01-17)

### Bug Fixes

-   **service:** 将插件的 html-webpack-plugin 位置添加到 plugins 首位 ([c34ee56](https://github.com/longshihui/vue-cli-plugin-navigator/commit/c34ee56))

<a name="2.0.2"></a>

## [2.0.2](https://github.com/longshihui/vue-cli-plugin-navigator/compare/v1.3.1...v2.0.2) (2019-01-15)

### Features

-   **service:** 兼容 cli 3.3.0 版本 ([24ba2f9](https://github.com/longshihui/vue-cli-plugin-navigator/commit/24ba2f9)), closes [#1](https://github.com/longshihui/vue-cli-plugin-navigator/issues/1)

<a name="2.0.1"></a>

## [2.0.1](https://github.com/longshihui/vue-cli-plugin-navigator/compare/v1.3.1...v2.0.1) (2019-01-02)

### Bug Fixes

-   修复 OptionDefaulter 对页面名字带.等特殊字符取值不正确的问题 ([35b3208](https://github.com/longshihui/vue-cli-plugin-navigator/commit/35b3208))

### Features

-   **homepage:** 主页新增标题，取自用户 package.json 的 name 字段 ([8cfd672](https://github.com/longshihui/vue-cli-plugin-navigator/commit/8cfd672))
-   **homepage:** 适应新的数据格式 ([ad63516](https://github.com/longshihui/vue-cli-plugin-navigator/commit/ad63516))
-   **OptionsDefaulter:** 新增插件配置项管理 ([a5fbeaa](https://github.com/longshihui/vue-cli-plugin-navigator/commit/a5fbeaa))
-   **ui:** 优化插件的 ui 可发现性 ([752dd83](https://github.com/longshihui/vue-cli-plugin-navigator/commit/752dd83))

### BREAKING CHANGES

-   **OptionsDefaulter:** 页面级别的 tags 和 description 不再在 projectOptions.pages 中定义
    需要重新定义至 projectOptions.pluginOptions.naviagtor.pages 下

<a name="1.3.1"></a>

## [1.3.1](https://github.com/longshihui/vue-cli-plugin-navigator/compare/v1.3.0...v1.3.1) (2018-11-08)

### Features

-   **插件:** 新增插件页面标题自动读取用户工程 package.json 的 name ([00343d3](https://github.com/longshihui/vue-cli-plugin-navigator/commit/00343d3))

<a name="1.2.4"></a>

## [1.2.4](https://github.com/longshihui/vue-cli-plugin-navigator/compare/v1.2.3...v1.2.4) (2018-11-07)

<a name="1.2.3"></a>

## [1.2.3](https://github.com/longshihui/vue-cli-plugin-navigator/compare/v1.2.2...v1.2.3) (2018-11-07)

### Bug Fixes

-   **inspect:** 修复 html-webpack-plugin 获取失败的问题 ([58ea877](https://github.com/longshihui/vue-cli-plugin-navigator/commit/58ea877))
-   **lib/index.js:** 修复针对主页生效模式不正确的问题 ([1a31fa6](https://github.com/longshihui/vue-cli-plugin-navigator/commit/1a31fa6))
-   **rollup:** 修复 rollup 依赖报错的问题 ([215e3cb](https://github.com/longshihui/vue-cli-plugin-navigator/commit/215e3cb))
-   修复引用为 null 的 bug ([e8a8653](https://github.com/longshihui/vue-cli-plugin-navigator/commit/e8a8653))

### Features

-   **navigator-index:** 新增"更多信息"栏，移除原有的描述、类型栏 ([3ce6ac0](https://github.com/longshihui/vue-cli-plugin-navigator/commit/3ce6ac0))
-   **package/plugin:** 新增插件所需要的数据 ([a897d87](https://github.com/longshihui/vue-cli-plugin-navigator/commit/a897d87))
-   **page.detail.view、dialog:** 新增 tags、description 字段展示、dlalog 组件支持响应式 ([08c6dc8](https://github.com/longshihui/vue-cli-plugin-navigator/commit/08c6dc8))

<a name="1.1.2"></a>

## [1.1.2](https://github.com/longshihui/vue-cli-plugin-navigator/compare/v1.1.1...v1.1.2) (2018-09-04)

<a name="1.1.1"></a>

## [1.1.1](https://github.com/longshihui/vue-cli-plugin-navigator/compare/v1.1.0...v1.1.1) (2018-09-04)

### Bug Fixes

-   **navigator-index:** 修复 Logo 不能正确打包的问题 ([5f766b4](https://github.com/longshihui/vue-cli-plugin-navigator/commit/5f766b4))

<a name="1.1.0"></a>

# [1.1.0](https://github.com/longshihui/vue-cli-plugin-navigator/compare/v1.0.1...v1.1.0) (2018-09-04)

### Features

-   新增插件，新增 rollup 打包 ([f5e52c0](https://github.com/longshihui/vue-cli-plugin-navigator/commit/f5e52c0))
-   **navigator-index:** 优化 UI，指定只有 dev 模式下插件才生效 ([5166abf](https://github.com/longshihui/vue-cli-plugin-navigator/commit/5166abf))

<a name="1.0.1"></a>

## [1.0.1](https://github.com/longshihui/vue-cli-plugin-navigator/compare/v1.0.0...v1.0.1) (2018-09-01)

<a name="1.0.0"></a>

# 1.0.0 (2018-09-01)
