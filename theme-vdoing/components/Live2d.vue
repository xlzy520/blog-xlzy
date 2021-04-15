<template>
  <div class="prpr" ref="prpr" id="prpr" @mousedown.stop="prprMousedown">
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
    </div>
  </div>
</template>

<script>
import { random } from '../util'
import model from '/theme-vdoing/public/live2d/waifu.json'
import tips from '/theme-vdoing/public/live2d/tips.json'
import costume from '/theme-vdoing/public/live2d/costume.json'
const { waifuClick, hoverTips, clickTips, hitokotos } = tips
export default {
  name: 'Live2d',
  data() {
    return {
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
      tips: '',
      prprStyle: {
        bottom: 0,
        right: 100,
        // left: 'px',
        // top: 'px'
      },
      onOff: true,
      startX: 0,
      startY: 0,
      moveX: 0,
      moveY: 0,
      prprDom: null
    }
  },
  methods: {
    css(elem,obj){
      for(var i in obj){
        elem.style[i] = obj[i];
      }
    },
    prprMouseup(evt){
      document.removeEventListener("mousemove",this.prprMousemove,false);
      document.removeEventListener("mouseup",this.prprMouseup,false);
      if(this.onOff) return false;
      this.prprStyle.right = this.moveX;
      this.prprStyle.bottom = this.moveY;
    },
    prprMousedown (evt){
      this.onOff = true;
      this.startX = evt.pageX;
      this.startY = evt.pageY;
      document.addEventListener("mousemove",this.prprMousedown,false);
      evt.preventDefault();
      document.addEventListener("mouseup",this.prprMouseup,false);
    },
    prprMousemove (evt){
      this.onOff=false;
      this.moveX = this.startX - evt.pageX+this.prprStyle.right;
      this.moveY = this.startY - evt.pageY+this.prprStyle.bottom;
      if (this.prprDom) {
        this.css(this.prprDom,{
          "right":this.moveX+"px",
          "bottom":this.moveY+"px"
        });
      } else {
        console.warn('prpr未加载或加载失败')
      }

      evt.preventDefault();
    },
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
          this.tips = clickTips.takePhoto
          // this.$store.dispatch('showTips', { tips: clickTips.takePhoto })
          break
        case 'talk':
          const inx = random(0, hitokotos.length - 1)
          const tips = hitokotos[inx].hitokoto
          this.tips = tips
          // this.$store.dispatch('showTips', { tips })
          break
        case 'close':
          this.tips = clickTips.close
          // this.$store.dispatch('showTips', { tips: clickTips.close })
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
      this.prprDom = document.querySelector('#prpr')
      this.dressup()
      this.loopTips()
    } else {
      this.showWaifu = false
    }
  },
}
</script>

<style lang="stylus">
.prpr {
  position: fixed;
  bottom: 0;
  right: 100px;
  z-index: $zindex-3;

  .waifu {
    position: relative;
    height: 250px;

    .tips {
      position: absolute;
      margin: 0 15px;
      padding: 5px 10px;
      width: 250px;
      min-height: 70px;
      border-radius: 8px;
      background-color: $bg-white-dim;
      box-shadow: $card-shadow;
      text-overflow: ellipsis;
      overflow: hidden;
      opacity: 1;
      animation: shake 50s ease-in-out 0s infinite;
      z-index: $zindex-bottom;

      &.pio {
        margin-top: -6px;
      }
      &.tia {
        margin-top: -12px;
      }
    }
  }

  .tool {
    position: absolute;
    bottom: 0;
    left: 0;

    .menu {
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
      background-color: $bg-white-deep;
      transition: all 0.3s ease-out;
      transform: translateX(-36px) scaleY(0.5);
      transform-origin: bottom;

      &:hover {
        background-color: $purple-dark;
        transform: translateX(0) scaleY(1);
        .devil {
          display: none;
        }
      }

      ul {
        margin-bottom: 66px;
        width: 35px;
        list-style: none;
        text-align: center;
        overflow: hidden;
        li {
          padding: 2px 0;
          &:hover {
            background-color: $purple-dim;
          }
          .icon {
            color: $whitesmoke;
          }
        }
      }

      .devil {
        position: absolute;
        top: 50%;
        right: 0;
        width: 15px;
        transform: translateY(-50%) scaleY(2);

        .icon {
          color: $purple;
          &::before {
            font-size: $font-size-small;
            transform: rotate(-90deg);
          }
        }
      }
    }
  }
}
</style>
