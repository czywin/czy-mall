import {debounce} from 'common/utils.js'
import BackTop from 'components/content/backTop/BackTop.vue'

export const itemListenerMixin = {
  data(){
    return {
      itemImgListener:null,
      refresh:null
    }
  },
  mounted(){
    this.refresh = debounce(this.$refs.scroll.refresh,50)
    this.itemImageListener =() => {
      this.refresh()
    }
    this.$bus.$on('itemImageLoad',this.itemImageListener)
  }
}

export const backTopMixin = {
  components:{
    BackTop
  },
  data(){
    return{
      isShowBackTop:false
    }
  },
  methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    listenShowBackTop(position){
      this.isShowBackTop = (-position.y) > 1000
    }
  }
}
