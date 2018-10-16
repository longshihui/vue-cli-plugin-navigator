import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import vue from 'rollup-plugin-vue';
import typescript from 'rollup-plugin-typescript2';
import css from 'rollup-plugin-css-only';
import path from 'path';
import rm from 'rimraf';
import autoprefixer from 'autoprefixer';
import postcssURL from 'postcss-url';

function getPackage(name) {
    return path.posix.resolve('./src/packages', name, 'main.ts');
}

process.env.NODE_ENV = 'production';

rm.sync('./dist');

export default [
    {
        input: getPackage('homepage'),
        output: {
            file: './dist/homepage.js',
            format: 'esm'
        },
        external: ['vue'],
        plugins: [
            resolve(),
            commonjs(),
            typescript(),
            vue({
                style: {
                    postcssPlugins: [
                        autoprefixer(),
                        postcssURL({
                            url: 'inline'
                        })
                    ]
                }
            })
        ]
    }
];
