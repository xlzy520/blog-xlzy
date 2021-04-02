const head = require('./config/head.js');
const plugins = require('./config/plugins.js');
const themeConfig = require('./config/themeConfig.js');

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  // theme: 'vdoing', // 使用依赖包主题
  theme: require.resolve('../../theme-vdoing'), // 使用本地主题

  title: "执笔看墨花开💜千千",
  description: '微末凡尘 心向天空。web前端技术博客,简洁至上,专注web前端学习与总结。JavaScript,js,ES6,TypeScript,vue,python,css3,html5,Node,git,github等技术文章。',
  // base: '/', // 格式：'/<仓库名>/'， 默认'/'
  // publicPath: isProd ? `https://cdn.jsdelivr.net/gh/xlzy520/blog-xlzy@gh-pages/` : '/',
  markdown: {
    lineNumbers: true, // 代码行号
  },
  shouldPreload: ()=> false,
  configureWebpack: config=>{
    config.output.publicPath = isProd ? `https://cdn.jsdelivr.net/gh/xlzy520/blog-xlzy@gh-pages/` : '/'
  },

  head,
  plugins,
  themeConfig,
}
