import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import url from '@rollup/plugin-url'
import svgr from '@svgr/rollup'
import external from 'rollup-plugin-peer-deps-external'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import typescriptEngine from 'typescript'

export default {
  input: ['src/index.tsx'],
  output: [
    {
      name: 'index.js',
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'named',
      preserveModulesRoot: 'src',
      sourcemap: true,
    },
    {
      name: 'index.esm.js',
      file: 'dist/index.esm.js',
      format: 'es',
      exports: 'named',
      preserveModulesRoot: 'src',
      sourcemap: true,
    },
  ],
  plugins: [
    babel({
      presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
      extensions: ['.js', '.ts', 'tsx', 'jsx'],
      babelHelpers: 'runtime',
      exclude: /node_modules/,
      plugins: [['@babel/transform-runtime', { regenerator: false, useESModules: false }]],
    }),
    external({
      includeDependencies: true,
    }),
    typescript({
      typescript: typescriptEngine,
      include: ['*.js+(|x)', '**/*.js+(|x)'],
      exclude: [
        'coverage',
        'dist',
        'example',
        'node_modules/**',
        '*.test.{js+(|x), ts+(|x)}',
        '**/*.test.{js+(|x), ts+(|x)}',
      ],
    }),
    url(),
    svgr(),
    resolve(),
    commonjs(),
    terser(),
  ],
}
