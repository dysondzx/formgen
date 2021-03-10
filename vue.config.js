const path = require('path')

const minify = process.env.NODE_ENV === 'development' ? false : {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true,
  minifyCSS: true,
  minifyJS: true
}

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/form-generator/'
    : '/',
  pages: {
    index: {
      entry: 'src/views/index/main.js',
      template: 'src/views/index/index.html',
      filename: 'index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
      minify
    },
    preview: {
      entry: 'src/views/preview/main.js',
      template: 'src/views/preview/preview.html',
      filename: 'preview.html',
      chunks: ['chunk-vendors', 'chunk-common', 'preview'],
      minify
    }
  },
  devServer: {
    overlay: false,
    proxy: {
      "/posts": {
        target: "https://jsonplaceholder.typicode.com",  //用于设置目标服务器host。当请求以/api开头的时候，则会被代理到http://localhost:3000
        changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
      }
    }
  },
  productionSourceMap: false,
  runtimeCompiler: true,
  transpileDependencies: ['_@babel_parser@7.13.9@@babel', '@babel', 'clipboard'],
  lintOnSave: false,
  configureWebpack: {
    externals: {
    }
  },
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
