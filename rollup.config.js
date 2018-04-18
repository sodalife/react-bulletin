import nodejs from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import builtin from 'rollup-plugin-node-builtins'

export default {
  input: 'src/index.jsx',
  output: {
    file: 'lib/bulletin.js',
    format: 'cjs',
    name: 'bulletin',
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      'prop-types': 'PropTypes',
      'rc-animate': 'RCAnimate',
    },
  },
  external: ['react', 'react-dom', 'prop-types', 'rc-animate'],
  plugins: [
    builtin(),
    nodejs(),
    commonjs({
      include: 'node_modules/**',
    }),
    postcss({
      modules: true,
    }),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
  ],
}
