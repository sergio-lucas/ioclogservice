import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from "rollup-plugin-terser";

export default {
  input: 'src/main.js',
  output: [{
    name: 'ioc',
    file: 'dist/bundle.js',
    format: 'cjs'
  },
  {
    name: 'ioc',
    file: 'dist/bundle.min.js',
    format: 'umd',
    plugins: [terser()]
  },
  {
    name: 'ioc',
    file: 'dist/bundle.esm.js',
    format: 'esm'
  }],
  plugins: [nodeResolve({
    jsnext: true,
    main: true,
    browser: true,
  }),
  commonjs()
  ]
};