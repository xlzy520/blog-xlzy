// nav
module.exports = [
  { text: '首页', link: '/' },
  {
    text: '技术',
    link: '/web/', //目录页链接，此处link是vdoing主题新增的配置项，有二级导航时，可以点击一级导航跳到目录页
    items: [
      // 说明：以下所有link的值只是在相应md文件定义的永久链接（不是什么特殊生成的编码）。另外，注意结尾是有斜杠的
      {
        text: '前端',
        items: [
          { text: 'JavaScript', link: '/pages/8143cc480faf9a11/' },
          { text: 'Vue', link: '/pages/5d463fbdb172d43b/' },
          { text: 'HTML', link: '/pages/8309a5b876fc95e3/' },
          { text: 'CSS', link: '/pages/c8f128/'},
        ],
      },
      {
        text: '前端之外',
        items: [
          { text: '技术文档', link: '/pages/9a7ee40fc232253e' },
          { text: '算法', link: '/pages/dea17d/' },
        ],
      },
      { text: '书单', link: '/pages/c09c43/', }
    ],
  },
  {
    text: '面试',
    link: '/interview/',
    items: [
      {
        text: '面试题库',
        link: '/interview/',
        items: [
          {text: '面试题清单', link: '/interview/'},
          {text: 'HTML', link: '/pages/4e46b6/'},
          {text: 'CSS', link: '/pages/990fc5/'},
          {text: 'JS', link: '/pages/dcff3f/'},
          {text: 'Vue', link: '/pages/7a583e/'},
          {text: 'React', link: '/pages/961224/'},
          // {text: '零碎', link: '/pages/a134b2/'}
        ]
      },
      {
        text: '面试心得',
        items: [
          {text: '杂言碎语', link: '/pages/331dbf/'},
        ]
      }
    ]
  },
  {
    text: '更多',
    link: '/more/',
    items: [
      { text: '心情杂货', link: '/pages/2d615df9a36a98ed/' },
      { text: '友情链接', link: '/friends/' },
      { text: '关于', link: '/about/' },
    ],
  },
  {
    text: '收藏',
    link: '/pages/beb6c0bd8a66cea6/',
    items: [
      { text: '前端', link: '/pages/702112/' },
      { text: '工具', link: '/pages/2294fc/' },
      { text: '设计 & CSS', link: '/pages/3d6da5/' },
      { text: '平台', link: '/pages/a14556/' },
      { text: '休闲娱乐', link: '/pages/e2847e/' },
      { text: '社区 & 论坛 & 博客', link: '/pages/a09a50/' },
    ],
  },
  {
    text: '索引',
    link: '/archives/',
    items: [
      { text: '分类', link: '/categories/' },
      { text: '标签', link: '/tags/' },
      { text: '归档', link: '/archives/' },
    ],
  },
]
