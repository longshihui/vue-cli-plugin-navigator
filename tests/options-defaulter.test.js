const OptionsDefaulter = require('../lib/OptionsDefaulter');

const PackageJSON = {
    name: 'test app name'
};

function sameArray(arr1, arr2) {
    return arr1.every(val => {
        return arr2.includes(val);
    });
}

describe('没有指定pluginOptions.navigator时', () => {
    const projectOptions = {
        pages: {
            page1: './page1.js',
            page2: './page2.js'
        },
        pluginOptions: null
    };
    const options = OptionsDefaulter(projectOptions, PackageJSON, null);
    it('title默认为: "welcome to ' + PackageJSON.name + '"', () => {
        expect(options.title).toBe('welcome to ' + PackageJSON.name);
    });

    it('defineTags为空数组', () => {
        expect(Array.isArray(options.defineTags)).toBe(true);
        expect(options.defineTags.length).toBe(0);
    });

    describe('defaults部分', () => {
        it('tags为空数组', () => {
            expect(Array.isArray(options.defaults.tags)).toBe(true);
            expect(options.defaults.tags.length).toBe(0);
        });
        it('description为none', () => {
            expect(typeof options.defaults.description).toBe('string');
            expect(options.defaults.description).toBe('none');
        });
    });

    describe('pages部分', () => {
        it('pages等于projectOptions.pages相同的页面数量', () => {
            expect(Object.keys(options.pages).length).toBe(
                Object.keys(projectOptions.pages).length
            );
            expect(
                Object.keys(options.pages).every(
                    pageName => pageName in projectOptions.pages
                )
            ).toBe(true);
        });

        it('每一个页面的tags为defaults.tags', () => {
            function validateTags(pageName) {
                return sameArray(
                    options.pages[pageName].tags,
                    options.defaults.tags
                );
            }
            expect(Object.keys(options.pages).every(validateTags)).toBe(true);
        });

        it('每一个页面的description为defaults.description', () => {
            function validateDesc(pageName) {
                return (
                    options.pages[pageName].description ===
                    options.defaults.description
                );
            }
            expect(Object.keys(options.pages).every(validateDesc)).toBe(true);
        });
    });
});

describe('指定pluginOptions.navigator', () => {
    const originalOptions = {
        title: 'test title',
        defineTags: [
            {
                name: 'app',
                color: 'red'
            },
            {
                name: 'other',
                color: 'blue'
            }
        ],
        defaults: {
            tags: ['app'],
            description: 'default description'
        },
        pages: {
            page1: {
                tags: ['page'],
                description: "i'm page1"
            }
        }
    };
    const projectOptions = {
        pages: {
            page1: './page1.js',
            page2: './page2.js'
        },
        pluginOptions: {
            navigator: originalOptions
        }
    };

    const finalOptions = OptionsDefaulter(
        projectOptions,
        PackageJSON,
        originalOptions
    );

    it('defineTags为配置的tags', () => {
        expect(Array.isArray(finalOptions.defineTags)).toBe(true);
        expect(
            sameArray(finalOptions.defineTags, originalOptions.defineTags)
        ).toBe(true);
    });

    it('title为配置的title', () => {
        expect(finalOptions.title).toBe(originalOptions.title);
    });

    describe('pages部分', () => {
        describe('page1', () => {
            it(
                'page1的tags为: ' + originalOptions.pages.page1.tags.join(','),
                () => {
                    expect(Array.isArray(finalOptions.pages.page1.tags)).toBe(
                        true
                    );
                    expect(finalOptions.pages.page1.tags.length).toBe(
                        originalOptions.pages.page1.tags.length
                    );
                    expect(
                        sameArray(
                            finalOptions.pages.page1.tags,
                            originalOptions.pages.page1.tags
                        )
                    ).toBe(true);
                }
            );

            it(
                'page1的description为: ' +
                    originalOptions.pages.page1.description,
                () => {
                    expect(finalOptions.pages.page1.description).toBe(
                        originalOptions.pages.page1.description
                    );
                }
            );
        });
        describe('page2', () => {
            it(
                'page2的tags为默认值: ' +
                    originalOptions.defaults.tags.join(','),
                () => {
                    expect(
                        sameArray(
                            finalOptions.pages.page2.tags,
                            originalOptions.defaults.tags
                        )
                    ).toBe(true);
                }
            );

            it(
                'page2的description为默认值: ' +
                    originalOptions.defaults.description,
                () => {
                    expect(finalOptions.pages.page2.description).toBe(
                        originalOptions.defaults.description
                    );
                }
            );
        });
    });
});
