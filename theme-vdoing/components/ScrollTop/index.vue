<template>
  <div class="wrapper" :style="backTopStyle">
    <div v-if="!isMobile" @click="scrollTop" :class="['back-to-top', 'cursor']"></div>
  </div>
</template>

<script>
export default {
  name: 'ScrollTop',
  data() {
    return {
      showBackTop: false,
      topDistance: -950,
      clientHeight: 0,
      lastScrollTimer: '',
      lastScrollAt: new Date(),
      isMobile: false
    }
  },
  computed: {
    backTopStyle() {
      return { transform: `translateY(${this.topDistance}px)` }
    },
  },
  mounted() {
    this.isMobile = window.innerWidth < 876;
    if (!this.isMobile) {
      window.addEventListener('scroll', this.handleScroll)
    }
  },
  methods: {
    // 滚动到顶部
    scrollTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    // 监听页面滚动
    handleScroll() {
      const now = new Date()
      if (now - this.lastScrollAt <= 150) return
      this.lastScrollAt = now
      this.handleTop()

      clearTimeout(this.lastScrollTimer)
      this.lastScrollTimer = setTimeout(this.handleTop, 300)
    },
    // 处理滚动事件
    handleTop() {
      // 更新顶部进度条
      const clientHeight = document.documentElement.clientHeight
      const scrollRange = document.body.clientHeight - clientHeight - 50
      const pageYOffset = window.pageYOffset
      // this.$Progress.set((pageYOffset / scrollRange) * 100)

      // 判断位置，控制滚动到顶部
      const showBackTop = pageYOffset >= 200
      if (showBackTop !== this.showBackTop || this.clientHeight !== clientHeight) {
        this.topDistance = -950 + (showBackTop ? clientHeight : 0)
        this.clientHeight = clientHeight
        this.showBackTop = showBackTop
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
@import './index.styl';
</style>
