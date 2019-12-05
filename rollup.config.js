import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import vue from 'rollup-plugin-vue';
import typescript from 'rollup-plugin-typescript2';
import path from 'path';
import rm from 'rimraf';
import autoprefixer from 'autoprefixer';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import replace from 'rollup-plugin-replace';

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
            format: 'iife'
        },
        plugins: [
            resolve(),
            commonjs(),
            replace({
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
            typescript({
                clean: true
            }),
            vue({
                style: {
                    postcssPlugins: [autoprefixer()]
                }
            }),
            babel({
                exclude: 'node_modules/**',
                runtimeHelpers: true
            }),
            terser()
        ]
    }
];
