// head
module.exports = [
  // 注入到页面<head> 中的标签，格式[tagName, { attrName: attrValue }, innerHTML?]
  ['link', { rel: 'icon', href: '/img/favicon.png' }], //favicons，资源放在public文件夹
  [
    'link',
    {
      rel: 'dns-prefetch',
      href: 'https://cdn.jsdelivr.net',
    },
  ],
  [
    'script',
    {
      src: 'https://cdn.jsdelivr.net/gh/chanshiyucx/aurora/public/live2d/live2d.min.js',
    },
  ],
  [
    'meta',
    {
      name: 'referrer',
      content: 'no-referrer',
    },
  ],
  [
    'meta',
    {
      name: 'keywords',
      content: '执笔看墨花开💜千千💜萧潇',
    },
  ],
  ['meta', { name: 'baidu-site-verification', content: 'DN3rafzeEO' }], // 百度统计的站长验证
  ['meta', { name: 'theme-color', content: '#F9BF45' }], // 移动浏览器主题颜色
  // [
  //   'script',
  //   {
  //     'data-ad-client': 'ca-pub-7828333725993554',
  //     async: 'async',
  //     src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
  //   },
  // ], // 网站关联Google AdSense 与 html格式广告支持
]
