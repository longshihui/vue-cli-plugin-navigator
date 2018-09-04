import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import vue from 'rollup-plugin-vue';
import typescript from 'rollup-plugin-typescript2';
import postcssURL from 'postcss-url';

export default [
  {
    input: './src/navigator-index/main.ts',
    output: {
      file: './dist/navigator-index.js',
      format: 'esm'
    },
    external: [
      'vue'
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript(),
      vue()
    ]
  },
  {
    input: './src/navigator-float/main.ts',
    output: {
      file: './dist/navigator-float.js',
      format: 'iife'
    },
    external: [
      'vue'
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript(),
      vue()
    ]
  }
]
