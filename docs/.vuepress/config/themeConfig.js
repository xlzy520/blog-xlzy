const nav = require('./themeConfig/nav.js');
const sidebar = require('./themeConfig/sidebar.js');
const htmlModules = require('./themeConfig/htmlModules.js');

// 主题配置
module.exports = {
  nav,
  sidebarDepth: 4, // 侧边栏显示深度，默认1，最大2（显示到h3标题）
  logo: '/img/favicon.png', // 导航栏logo
  repo: 'xugaoyi/vuepress-theme-vdoing', // 导航栏右侧生成Github链接
  searchMaxSuggestions: 10, // 搜索结果显示最大数
  lastUpdated: '上次更新', // 开启更新时间，并配置前缀文字   string | boolean (取值为git提交时间)
  docsDir: 'docs', // 编辑的文件夹
  editLinks: true, // 启用编辑
  editLinkText: '编辑',

  //*** 以下配置是Vdoing主题改动和新增的配置 ***//

  // category: false, // 是否打开分类功能，默认true。 如打开，会做的事情有：1. 自动生成的frontmatter包含分类字段 2.页面中显示与分类相关的信息和模块 3.自动生成分类页面（在@pages文件夹）。如关闭，则反之。
  // tag: false, // 是否打开标签功能，默认true。 如打开，会做的事情有：1. 自动生成的frontmatter包含标签字段 2.页面中显示与标签相关的信息和模块 3.自动生成标签页面（在@pages文件夹）。如关闭，则反之。
  // archive: false, // 是否打开归档功能，默认true。 如打开，会做的事情有：1.自动生成归档页面（在@pages文件夹）。如关闭，则反之。
  // categoryText: '随笔', // 碎片化文章（_posts文件夹的文章）预设生成的分类值，默认'随笔'

  bodyBgImg: [
    'https://i0.hdslb.com/bfs/album/375bfad6dda18280f8e05c92db17b4a588d65aee.jpg',
    'https://i0.hdslb.com/bfs/album/cd04c2c31f0aafe6da573d5a25c0339f51418d64.jpg',
    'https://i0.hdslb.com/bfs/album/944bd435b4a31c16de1e29bdfc30e33b15b11f24.jpg',
    'https://i0.hdslb.com/bfs/album/243290acc936525c332661b5ee7aacca29579955.jpg',
    'https://i0.hdslb.com/bfs/album/fdeb5b5aeccf3ec43f424dd3baafea245331948e.jpg',
    'https://i0.hdslb.com/bfs/album/e20b2368e5439e2d0b0aadb4bffd3bd8471e0a81.jpg',
    'https://i0.hdslb.com/bfs/album/e9996999c86d9057caa554f6ac96747210551af7.jpg',
    'https://i0.hdslb.com/bfs/album/8400b3e997d555a88c3748a1456f317b0e7823b5.jpg',
    'https://i0.hdslb.com/bfs/album/aa6dae662a96c50b48dfae96197a0bcbafb7e784.jpg',
  ], // body背景大图，默认无。 单张图片 String || 多张图片 Array, 多张图片时每隔15秒换一张。
  bodyBgImgOpacity: 0.5, // body背景图透明度，选值 0 ~ 1.0, 默认0.5

  // titleBadge: false, // 文章标题前的图标是否显示，默认true
  // titleBadgeIcons: [ // 文章标题前图标的地址，默认主题内置图标
  //   '图标地址1',
  //   '图标地址2'
  // ],
  // contentBgStyle: 1, // 文章内容块的背景风格，默认无. 1 => 方格 | 2 => 横线 | 3 => 竖线 | 4 => 左斜线 | 5 => 右斜线 | 6 => 点状

  // updateBar: { // 最近更新栏
  //   showToArticle: true, // 显示到文章页底部，默认true
  //   moreArticle: '/archives' // “更多文章”跳转的页面，默认'/archives'
  // },
  // rightMenuBar: false, // 是否显示右侧文章大纲栏，默认true (屏宽小于1300px下无论如何都不显示)
  // sidebarOpen: false, // 初始状态是否打开侧边栏，默认true
  // pageButton: false, // 是否显示快捷翻页按钮，默认true

  sidebar: 'structuring', // 侧边栏  'structuring' | { mode: 'structuring', collapsable: Boolean} | 'auto' | 自定义    温馨提示：目录页数据依赖于结构化的侧边栏数据，如果你不设置为'structuring',将无法使用目录页

  author: {
    // 文章默认的作者信息，可在md文件中单独配置此信息 String | {name: String, link: String}
    name: '执笔看墨花开', // 必需
    link: 'https://github.com/xlzy520', // 可选的
  },
  blogger: {
    // 博主信息，显示在首页侧边栏
    avatar: 'https://i0.hdslb.com/bfs/album/5f87da36a07024188d7fe0feb081a470a6cdcf31.jpg@200w_200h_1e_1c.webp',
    name: '执笔看墨花开',
    slogan: '玩转代码，顺其自然',
  },
  social: {
    // 社交图标，显示于博主信息栏和页脚栏
    // iconfontCssFile: '//at.alicdn.com/t/font_1678482_u4nrnp8xp6g.css', // 可选，阿里图标库在线css文件地址，对于主题没有的图标可自由添加
    icons: [
      {
        iconClass: 'icon-youjian',
        title: '发邮件',
        link: 'mailto:1017866168@qq.com',
      },
      {
        iconClass: 'icon-github',
        title: 'GitHub',
        link: 'https://github.com/xlzy520',
      },
      {
        iconClass: 'icon-erji',
        title: '听音乐',
        link: 'https://music.163.com/#/playlist?id=73382465',
      },
    ],
  },
  footer: {
    // 页脚信息
    createYear: 2021, // 博客创建年份
    copyrightInfo:
      '执笔看墨花开 | <a href="https://github.com/xlzy520/xlzy-blog/blob/master/LICENSE" target="_blank">MIT License</a>', // 博客版权信息，支持a标签
  },
  htmlModules // 插入hmtl(广告)模块
}
