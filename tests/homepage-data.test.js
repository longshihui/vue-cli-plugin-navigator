const _ = require('lodash');
const DataCreator = require('../lib/HomepageDataCreator');
const OptionsDefaulter = require('../lib/OptionsDefaulter');
const Encryptor = require('../lib/Encryptor');

function sameArray(arr1, arr2) {
    return arr1.every(val => {
        return arr2.includes(val);
    });
}

describe('projectOptions.pages配置均为string时', () => {
    let pluginOptions = null;
    const packageJSON = {
        name: 'app'
    };
    const projectOptions = {
        pages: {
            page1: './src/page1.js'
        }
    };
    pluginOptions = OptionsDefaulter(
        projectOptions,
        packageJSON,
        pluginOptions
    );
    const data = Encryptor.decoding(DataCreator(projectOptions, pluginOptions));

    it('title为welcome to ' + packageJSON.name, () => {
        expect(data.title).toBe('welcome to ' + packageJSON.name);
    });

    it('defineTags为[]', () => {
        expect(Array.isArray(data.defineTags)).toBe(true);
        expect(data.defineTags.length).toBe(0);
    });

    describe('pages部分', () => {
        it('pages为长度不为0的数组', () => {
            expect(Array.isArray(data.pages)).toBe(true);
            expect(data.pages.length).toBe(
                Object.keys(projectOptions.pages).length
            );
        });
        it('page1的数据计算正确', () => {
            const pageData = data.pages[0];
            expect(pageData).not.toBe(undefined);
            expect(pageData.name).toBe('page1');
            expect(
                Array.isArray(pageData.tags) && pageData.tags.length === 0
            ).toBe(true);
            expect(pageData.description).toBe('none');
            expect(pageData.title).toBe('page1');
            expect(pageData.path).toBe('/page1.html');
        });
    });
});

describe('projectOptions.pages配置为对象时', () => {
    let pluginOptions = {
        title: 'title',
        defineTags: [
            {
                name: 'app',
                color: 'red'
            },
            {
                name: 'test tag',
                color: 'red'
            }
        ],
        defaults: {
            tags: ['app'],
            description: 'test description'
        },
        pages: {
            page2: {
                tags: ['app'],
                description: 'page2 description'
            }
        }
    };
    const packageJSON = {
        name: 'app'
    };
    const projectOptions = {
        pages: {
            page1: {
                entry: './src/page1.js',
                title: 'page1 title'
            },
            page2: {
                entry: './src/page2.js',
                title: 'page2 title'
            }
        }
    };
    pluginOptions = OptionsDefaulter(
        projectOptions,
        packageJSON,
        pluginOptions
    );
    const data = Encryptor.decoding(DataCreator(projectOptions, pluginOptions));

    it('title为' + pluginOptions.title, () => {
        expect(data.title).toBe(pluginOptions.title);
    });

    it('defineTags为' + pluginOptions.defineTags.join(','), () => {
        function sameTags(tags1, tags2) {
            if (tags1.length !== tags2.length) {
                return false;
            }
            return tags1.every(tag => {
                const targetTag = tags2.find(t => t.name === tag.name);
                return (
                    _.isPlainObject(targetTag) &&
                    tag.color === targetTag.color &&
                    tag.name === targetTag.name
                );
            });
        }
        expect(Array.isArray(data.defineTags)).toBe(true);
        expect(sameTags(data.defineTags, pluginOptions.defineTags)).toBe(true);
    });

    describe('pages部分', () => {
        it('pages为长度不为0的数组', () => {
            expect(Array.isArray(data.pages)).toBe(true);
            expect(data.pages.length).toBe(
                Object.keys(projectOptions.pages).length
            );
        });

        it('page1的数据计算正确', () => {
            const pageName = 'page1';
            const pageData = data.pages.find(
                config => config.name === pageName
            );
            expect(pageData).not.toBe(undefined);
            expect(pageData.name).toBe(pageName);
            expect(sameArray(pageData.tags, pluginOptions.defaults.tags)).toBe(
                true
            );
            expect(pageData.description).toBe(
                pluginOptions.defaults.description
            );
            expect(pageData.title).toBe(projectOptions.pages.page1.title);
            expect(pageData.path).toBe(`/${pageName}.html`);
        });

        it('page2的数据计算正确', () => {
            const pageName = 'page2';
            const pageData = data.pages.find(
                config => config.name === pageName
            );
            expect(pageData).not.toBe(undefined);
            expect(pageData.name).toBe(pageName);
            expect(
                sameArray(pageData.tags, pluginOptions.pages.page2.tags)
            ).toBe(true);
            expect(pageData.description).toBe(
                pluginOptions.pages.page2.description
            );
            expect(pageData.title).toBe(projectOptions.pages.page2.title);
            expect(pageData.path).toBe(`/${pageName}.html`);
        });
    });
});
