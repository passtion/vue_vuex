<style >
  .xs-plugin-pullup-container {
    text-align: center;
  }

</style>
<template>
  <div :style="styles">
    <div class="xs-container">
      <slot></slot>

      <slot name="pulldown"></slot>
      <slot name="pullup"></slot>
    </div>
    <Public-go-top
      v-if="topFlag && heightFlag"
      :go-top="backTop"
    >
    </Public-go-top>
  </div>
</template>

<script>
import XScroll from './../../../../vux-xscroll/build/cmd/xscroll.js'
import Pulldown from './../../../../vux-xscroll/build/cmd/plugins/pulldown'
import PublicGoTop from './../../../../../app/PC/components/public/Public-goTop.vue';
import Pullup from './../../../../vux-xscroll/build/cmd/plugins/pullup'

const pulldownDefaultConfig = () => ({
  content: 'Pull Down To Refresh',
  height: 60,
  autoRefresh: false,
  downContent: 'Pull Down To Refresh',
  upContent: 'Release To Refresh',
  loadingContent: 'Loading...',
  clsPrefix: 'xs-plugin-pulldown-'
})

const pullupDefaultConfig = () => ({
  content: 'Pull Up To Refresh',
  pullUpHeight: 60,
  height: 40,
  autoRefresh: false,
  downContent: 'Release To Refresh',
  upContent: 'Pull Up To Refresh',
  loadingContent: 'Loading...',
  clsPrefix: 'xs-plugin-pullup-'
})
let [y,timeRun] = [0,null];
export default {
  components:{
    PublicGoTop
  },
  data(){
    return{
      heightFlag :false
    }
  },
  props: {
    topFlag:{
      type:Boolean,
      default: false
    },

    height: String,
    lockX: Boolean,
    lockY: Boolean,
    scrollbarX: Boolean,
    scrollbarY: Boolean,
    bounce: {
      type: Boolean,
      default: true
    },
    useOriginScroll: {
      type: Boolean,
      default: false
    },
    useTransition: {
      type: Boolean,
      default: true
    },
    preventDefault: {
      type: Boolean,
      default: true
    },
    stopPropagation: Boolean,
    boundryCheck: {
      type: Boolean,
      default: true
    },
    gpuAcceleration: {
      type: Boolean,
      default: true
    },
    usePulldown: {
      type: Boolean,
      default: false
    },
    usePullup: {
      type: Boolean,
      default: false
    },
    /**
    * refer to: http://xscroll.github.io/node_modules/xscroll/doc/PullDown.html
    */
    pulldownConfig: {
      type: Object,
      default () {
        return {}
      }
    },
    pullupConfig: {
      type: Object,
      default () {
        return {}
      }
    },
    pulldownStatus: {
      type: String,
      default: 'default',
      twoWay: true
    },
    pullupStatus: {
      type: String,
      default: 'default',
      twoWay: true
    },
    enableHorizontalSwiping: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    reset (scrollPosition) {
      if (scrollPosition) {
        if (typeof scrollPosition.left !== 'undefined') {
          this._xscroll.scrollLeft(scrollPosition.left)
        }
        if (typeof scrollPosition.top !== 'undefined') {
          this._xscroll.scrollTop(scrollPosition.top)
        }
      }
      setTimeout(() => {
        this._xscroll && this._xscroll.render()
      })
    },
    getY(){
      return parseFloat((this.$el.querySelector('.xs-container').style.transform.replace(/translateY\(/ig,",").split(','))[1]);
    },
    goTop(){
      this.reset({top:0})
    },
    backTop(){
      const itemNo= -100;
      this.reset({top:1100})
      let forAnim = null;
      const anim = (num) => {
        const num2 = num - itemNo >0 ? 0 : num - itemNo;
        this.reset({top:-num2})
        if (num2==0) {
          clearTimeout(forAnim);
          return;
        }
        forAnim =  setTimeout(()=>{anim(num2)},10)

      }
      anim(-1100);

    },
    watchY(){
      y = -this.getY();
      timeRun = setTimeout(()=> {
        this.watchY()
      }, 10)
      if (this.heightFlag == (y > 1100)){
        return;};
      this.heightFlag = ( y > 1100);
    }
  },
  compiled () {
    this.uuid = Math.random().toString(36).substring(3, 8)
  },
  computed: {
    styles () {
      if (!this.height && !this.$el.style.height && this.lockX) {
        this.height = `${document.documentElement.clientHeight}px`
        this.reset()
      }

      if (this.height && this.height.indexOf('-') === 0) {
        this.height = `${document.documentElement.clientHeight + parseInt(this.height)}px`
      }

      return {
        height: `${this.height}`
      }
    }
  },
  ready () {
//    this.$watch("this.getY()",(res)=>{
//      alert(res)
//      this.heightFlag =( -res>1100);
//      if(-res>1100){
//
//      }
//    })
    this.watchY();

    this.$el.setAttribute('id', `vux-scroller-${this.uuid}`)
    let content = null
    const slotChildren = this.$el.querySelector('.xs-container').childNodes
    for (let i = 0; i < slotChildren.length; i++) {
      if (slotChildren[i].nodeType === 1) {
        content = slotChildren[i]
        break
      }
    }
    if (!content) {
      throw new Error('no content is found')
    }

    this._xscroll = new XScroll({
      renderTo: `#vux-scroller-${this.uuid}`,
      lockX: this.lockX,
      lockY: this.lockY,
      scrollbarX: this.scrollbarX,
      scrollbarY: this.scrollbarY,
      content: content,
      bounce: this.bounce,
      useOriginScroll: this.useOriginScroll,
      useTransition: this.useTransition,
      preventDefault: this.preventDefault,
      boundryCheck: this.boundryCheck,
      gpuAcceleration: this.gpuAcceleration,
      stopPropagation: this.stopPropagation
    })

    if (this.usePulldown) {
      // if use slot=pulldown
      let container = this.$el.querySelector('div[slot="pulldown"]')
      let config = Object.assign(pulldownDefaultConfig(), this.pulldownConfig)
      if (container) {
        config.container = container
      }
      this.pulldown = new Pulldown(config)
      this._xscroll.plug(this.pulldown)
      this.pulldown.on('loading', (e) => {
        this.$emit('pulldown:loading', this.uuid)
      })
      this.pulldown.on('statuschange', (val) => {
        this.pulldownStatus = val.newVal
      })
    }

    if (this.usePullup) {
      // if use slot=pullup
      let container = this.$el.querySelector('div[slot="pullup"]')
      let config = Object.assign(pullupDefaultConfig(), this.pullupConfig)

      if (container) {
        config.container = container
      }
      this.pullup = new Pullup(config)
      this._xscroll.plug(this.pullup)
      this.pullup.on('loading', (e) => {
        this.$emit('pullup:loading', this.uuid)
      })
      this.pullup.on('statuschange', (val) => {
        this.pullupStatus = val.newVal
      })
    }

    if (this.enableHorizontalSwiping) {
      this._xscroll.on('panstart', (e) => {
        if (e.direction === 2 || e.direction === 4) {
          e.preventDefault()
          if (this.scrollbarY) {
            this._xscroll.userConfig.scrollbarY = false
          }
          this._xscroll.userConfig.lockY = true
        }
      })
      this._xscroll.on('panend', () => {
        if (this.scrollbarY) {
          this._xscroll.userConfig.scrollbarY = true
        }
        this._xscroll.userConfig.lockY = false
      })
    }

    this._xscroll.render()
  },
  events: {
    'pulldown:reset' (uuid) {
      // set pulldown status to default
      this.pulldownStatus = 'default'
      if (uuid === this.uuid) {
        this.pulldown.reset(() => {
          // repaint
          this.reset()
        })
      }
    },
    'pullup:reset' (uuid) {
      // set pulldown status to default
      this.pullupStatus = 'default'
      if (uuid === this.uuid) {
        this.pullup.complete()
        this.reset()
      }
    },
    'pullup:done' (uuid) {
      if (uuid === this.uuid) {
        this._xscroll.unplug(this.pullup)
      }
    },
    'scroller:reset' (uuid) {
      if (uuid === this.uuid) {
        this.reset()
      }
    },
    'pullup:disable' (uuid) {
      if (uuid === this.uuid) {
        this.pullup.stop()
      }
    },
    'pullup:enable' (uuid) {
      if (uuid === this.uuid) {
        this.pullup.restart()
      }
    }
  },
  beforeDestroy () {
    clearTimeout(timeRun);
    if (this.pullup) {
      this._xscroll.unplug(this.pullup)
      this.pullup.pluginDestructor()
    }
    if (this.pulldown) {
      this._xscroll.unplug(this.pulldown)
      this.pulldown.pluginDestructor()
    }
    this._xscroll.destroy()
    this._xscroll = null
  }
}
</script>


