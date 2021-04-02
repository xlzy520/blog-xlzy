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

    <div class="prpr">
      <div class="waifu" v-if="showWaifu">
        <div v-show="tips && isMini" :class="['tips', this.waifu === 'tia' && 'tia']" v-html="tips"></div>
        <canvas @click="handleClickWaifu" id="live2d" width="280" height="250" />
      </div>
      <div class="tool">
        <div class="menu" v-if="showWaifu">
          <ul>
            <li
                class="cursor"
                v-for="item in menu"
                :key="item.type"
                @click="handleClick(item.type)"
                @mouseenter="handleHover(item.type)"
            >
              <i :class="['icon', `l-icon-${item.icon}`]"></i>
            </li>
          </ul>
          <div class="devil">
            <i class="icon l-icon-emo-devil"></i>
          </div>
        </div>
        <APlayer :class="isMini && 'mini'" :audio="audio" preload="none" fixed mini @update:mini="handleUpdate" />
      </div>
    </div>

    <!--Vdoing主题遵循MIT协议，完全开源且免费。如果您对主题的修改并不大，希望您保留主题的链接。-->
    Theme by
    <a
      href="https://github.com/xugaoyi/vuepress-theme-vdoing"
      target="_blank"
      title="本站主题"
    >Vdoing</a>
    <template v-if="footer">
      | Copyright © {{ footer.createYear }}-{{ new Date().getFullYear() }}
      <span
        v-html="footer.copyrightInfo"
      ></span>
    </template>
  </div>
</template>

<script>
import { random } from '../util'
import model from '/theme-vdoing/public/live2d/waifu.json'
import tips from '/theme-vdoing/public/live2d/tips.json'
import costume from '/theme-vdoing/public/live2d/costume.json'
const { waifuClick, hoverTips, clickTips, hitokotos } = tips

export default {
  data() {
    return {
      // sakura,
      showWaifu: true,
      waifu: 'tia',
      textures: '',
      menu: [
        { icon: 'venus-double', type: 'switch' },
        { icon: 't-shirt', type: 'dressup' },
        { icon: 'camera', type: 'takephoto' },
        { icon: 'comment', type: 'talk' },
        { icon: 'cancel-outline', type: 'close' },
      ],
      // audio: this.$config.APlayer,
      isMini: true,
      isMobile: false,
      tips: [],
      audio: [
        {
          name: '三年幻想郷',
          artist: '神乃木製作所',
          url: 'https://music.163.com/song/media/outer/url?id=767452.mp3',
          cover: 'https://p1.music.126.net/QdxRMFtZCNkTsvJtNfpHpg==/565148976688829.jpg?param=130y130'
        },
        {
          name: '水面の満月',
          artist: '神乃木製作所',
          url: 'https://music.163.com/song/media/outer/url?id=767726.mp3',
          cover: 'https://p2.music.126.net/7AvaL3kt8uaC-ouLOr1C4w==/664105023188835.jpg?param=130y130'
        },
        {
          name: '素直と不器用と意地っ張り',
          artist: '三輪学',
          url: 'https://music.163.com/song/media/outer/url?id=478095.mp3',
          cover: 'https://p2.music.126.net/RIOvUtQejxeI5S2sP_nmiw==/3434874333355654.jpg?param=130y130'
        },
        {
          name: '比翼の羽根',
          artist: 'eufonius',
          url: 'https://music.163.com/song/media/outer/url?id=718551.mp3',
          cover: 'https://p2.music.126.net/c5-mvashaLJseFBwP3md4A==/109951163351769650.jpg?param=130y130'
        },
        {
          name: '春よ、来い',
          artist: 'SMOOTH J',
          url: 'https://music.163.com/song/media/outer/url?id=511369.mp3',
          cover: 'https://p1.music.126.net/DWZH0eov-uLttdjzpNB26w==/6050612487861686.jpg?param=130y130'
        },
        {
          name: '山水之间',
          artist: '许嵩',
          url: 'https://music.163.com/song/media/outer/url?id=28802028.mp3',
          cover: 'https://p1.music.126.net/WoR2LbM1IFauFpvhBWOjqA==/6642149743396577.jpg?param=130y130'
        },
        {
          name: '我想牵着你的手',
          artist: '许嵩',
          url: 'https://music.163.com/song/media/outer/url?id=167903.mp3',
          cover: 'https://p2.music.126.net/l-WSrtuUVlxINzqz6ADOOA==/45079976751178.jpg?param=130y130'
        },
        {
          name: '花のように',
          artist: '松たか子',
          url: 'https://music.163.com/song/media/outer/url?id=610661.mp3',
          cover: 'https://p1.music.126.net/048eUFnzBGOef54h84XeFg==/811439581298946.jpg?param=130y130'
        },
        {
          name: '光るなら(TV动画《四月是你的谎言》OP1 ；TVアニメ「四月は君の嘘」OP1)',
          artist: 'Goose house',
          url: 'https://music.163.com/song/media/outer/url?id=29732992.mp3',
          cover: 'https://p2.music.126.net/hspOpLQKDm_ODcZj9Rd1CQ==/109951163477942900.jpg?param=200y200'
        },
        {
          name: 'secret base ~君がくれたもの~ (10 years after Ver.)',
          artist: '茅野愛衣 / 戸松遥 / 早見沙織',
          url: 'https://music.163.com/song/media/outer/url?id=33911781.mp3',
          cover: 'httpss://p1.music.126.net/6fw0sKYnqkWjisM7w7_4DQ==/109951163078058569.jpg?param=180y180'
        },
        {
          name: '恋愛サーキュレーション',
          artist: '花澤香菜',
          url: 'https://music.163.com/song/media/outer/url?id=579954.mp3',
          cover: 'https://p2.music.126.net/hWrYLdhzF4waj4WL1dFPmg==/642114790633458.jpg?param=130y130'
        },
      ]
    }
  },
  computed: {
    social () {
      return this.$themeConfig.social
    },
    footer () {
      return this.$themeConfig.footer
    }
  },
  methods: {
    dressup(switchWaifu = false) {
      if (switchWaifu) this.waifu = this.waifu === 'tia' ? 'pio' : 'tia'
      // 获取装扮
      const waifuCostume = costume[this.waifu]
      let textures
      while (!textures || textures === model.textures[0]) {
        textures = waifuCostume[random(0, waifuCostume.length - 1)]
      }
      this.textures = textures
      // 获取模型
      model.model = `moc/${this.waifu}.moc`
      model.textures = [textures]
      // 设置缩放比例
      model.layout.width = this.waifu === 'tia' ? 1.82 : 2
      window.waifuModel = model
      window.loadlive2d('live2d', 'https://cdn.jsdelivr.net/gh/xlzy520/xlzy520.github.io/live2d/', '')
    },
    loopTips() {
      setTimeout(this.loopTips, 16 * 1000)
      const now = new Date()
      if (this.tips || (this.tipsUpdateAt && now - this.tipsUpdateAt < 6000)) return
      const inx = random(0, hitokotos.length - 1)
      const nextTips = hitokotos[inx].hitokoto
      this.tips = nextTips
      // this.$store.dispatch('showTips', { tips: nextTips })
    },
    handleClickWaifu() {
      let nextTips = this.tips
      while (nextTips === this.tips) {
        const inx = random(0, waifuClick.length - 1)
        nextTips = waifuClick[inx]
      }
      this.tips = nextTips

      // this.$store.dispatch('showTips', { tips: nextTips })
    },
    handleHover(type) {
      let tips
      if (type === 'switch') {
        tips = `要召唤<span style="color: #b854d4">${
            this.waifu === 'pio' ? ' 欧内酱 Tia ' : ' 一抹多 Pio '
        } </span>么(◍˃̶ᗜ˂̶◍)✩`
      } else {
        tips = hoverTips[type]
      }
      if (!tips) return
      this.tips = tips
      // this.$store.dispatch('showTips', { tips })
    },
    handleClick(type) {
      switch (type) {
        case 'switch':
          this.dressup(true)
          break
        case 'dressup':
          this.dressup()
          break
        case 'takephoto':
          window.Live2D.captureName = 'waifu.png'
          window.Live2D.captureFrame = true
          this.$store.dispatch('showTips', { tips: clickTips.takePhoto })
          break
        case 'talk':
          const inx = random(0, hitokotos.length - 1)
          const tips = hitokotos[inx].hitokoto
          this.$store.dispatch('showTips', { tips })
          break
        case 'close':
          this.$store.dispatch('showTips', { tips: clickTips.close })
          setTimeout(() => {
            this.showWaifu = false
          }, 2000)
          break
        default:
          return
      }
    },
    handleUpdate(isMini) {
      this.isMini = isMini
    },
    dropPanel() {
      // this.$store.commit('setShowPanel', true)
    },
  },
  mounted() {
    this.isMobile = window.innerWidth < 876;
    if (!this.isMobile) {
      this.dressup()
      this.loopTips()
    }

  },
}
</script>

<style lang='stylus'>
@require '../styles/footer.styl'

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
