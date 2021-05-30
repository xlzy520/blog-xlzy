# SPA单页应用直接使用百度统计

### 以前

单页面应用（vuepress）切换过程中，不会重新加载页面，故而不会触发百度统计。所以需要监听路由切换事件，当切换页面时, 手动上报百度统计。



### 时代变了

在 [这里](https://tongji.baidu.com/sc-web/10000162895/home/spa) 可以启用单页应用数据统计，启用之后，百度统计会基于[ History API ](https://developer.mozilla.org/en-US/docs/Web/API/History_API)或者[ hashchange ](https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event)自动为[ 单页应用 ](https://baike.baidu.com/item/SPA/17536313)记录页面 PV 日志，开发者无需在路由切换时手动埋点，[查看详情](https://tongji.baidu.com/web/help/article?id=324&type=0)。

https://tongji.baidu.com/sc-web/10000162895/home/spa

![image-20210530180105785](http://i0.hdslb.com/bfs/album/67c77a9871ac469871f73ff9c4eaa139076c9ee3.png)