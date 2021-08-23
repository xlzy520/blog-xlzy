<template>
  <div class="footer">
    <div
      class="icons"
      v-if="social && social.icons"
    >
      <a
        :href="item.link"
        :title="item.title"
        :class="['iconfont', item.iconClass]"
        v-for="(item, index) in social.icons"
        :key="index"
        target="_blank"
      ></a>
    </div>

    <live2d />
    <APlayer class="my-player" :class="isMini && 'mini'" :audio="audio" preload="none"
             fixed mini @update:mini="handleUpdate" />

    <!--Vdoing主题遵循MIT协议，完全开源且免费。如果您对主题的修改并不大，希望您保留主题的链接。-->
    Theme by
    <a
      href="https://github.com/xugaoyi/vuepress-theme-vdoing"
      target="_blank"
      title="本站主题"
    >Vdoing</a>
    <template v-if="footer">
      <p>
        © {{ footer.createYear }}-{{ new Date().getFullYear() }} 执笔看墨花开
      </p>
      <a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2021110554号</a>
    </template>
  </div>
</template>

<script>
import Live2d from "./Live2d";

export default {
  components: {Live2d},
  data() {
    return {
      isMini: true,
      isMobile: false,
    }
  },
  computed: {
    social () {
      return this.$themeConfig.social
    },
    footer () {
      return this.$themeConfig.footer
    },
    audio(){
      return this.$themeConfig.audio
    }
  },
  methods: {
    handleUpdate(isMini) {
      this.isMini = isMini
    },
  },
  mounted() {

  },
}
</script>

<style lang='stylus'>
.my-player{
  &.aplayer {
    max-width: 310px;
    background-color: transparent;
    transition: all 0.3s ease-out;
    &:hover {
      transform: translateX(0);
    }

    .aplayer-miniswitcher {
      width: 15px;
      background-color: $purple-dark;
      path {
        fill: white;
      }
    }

    &.aplayer-fixed.aplayer-narrow.aplayer-mobile{
      .aplayer-body {
        //width: 26px!important;
        height: 26px;
      }
      .aplayer-pic .aplayer-play{
        bottom: 0;
      }
    }

    .aplayer-body {
      padding-right: 15px;
      width: 310px;
      border-radius: 0 3px 3px 0;
      background-color: $bg-white-deep;
    }

    .aplayer-list {
      border: none;
      border-top-right-radius: 3px;
      background-color: $bg-white-deep;
      background-image: $aplayer-bg;
      background-size: contain;
      //background-repeat: no-repeat;
      background-position: center center;

      li {
        border: none;
        background-color: rgba(240,255,255,.6);
        color: #333;
        &:hover,
        &.aplayer-list-light {
          background-color: $bg-aplayer;
          span {
            color: white;
          }
        }
        .aplayer-list-cur {
          height 32px;
          top: 0;
          background-color: $purple-dark !important;
        }
      }
    }
  }

  &.mini {
    transform: translateX(-100%);
  }
}
.cursor{
  cursor: pointer;
}

//@require '../styles/footer.styl'

// $mobileSidebarWidth = $sidebarWidth * 0.82
.footer
  padding 5rem 1.5rem 2.5rem
  text-align center
  color #666
  box-sizing border-box
  font-size 0.85rem
  transition all 0.2s ease
  .icons
    margin-bottom 12px
    .iconfont
      padding 0 10px
      font-size 1.3rem
  a
    color inherit
    &:hover
      color $accentColor
@media (min-width ($MQMobile + 1px))
  .sidebar-open .footer
    width auto
    padding-left ($sidebarWidth + 1.5rem)
@media (min-width 1520px)
  .have-rightmenu .footer
    padding-right ($rightMenuWidth + 1.5rem)
.no-sidebar .footer
  width auto
  padding-left 1.5rem
</style>
