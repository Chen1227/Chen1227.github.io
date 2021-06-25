<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="nav" class="detail-nav"/>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentscroll">
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @detailImageLoad="detailImageLoad"/>
      <detail-param-info ref="params" :paramInfo="paramInfo"/>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <back-top @click.native="topClick" v-show="isTrue"/>
    <detail-bottom-bar @addToCart="addCart"/>
		<toast :message="message" :isShow="isShow"></toast>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetaiBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'
  import BackTop from 'components/content/backTop/BackTop'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'
	import Toast from 'components/common/toast/Toast'
  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'

  import {debounce} from 'common/utils'

  export default{
    name:'Detail',
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList,
      BackTop,
			Toast
    },
    data(){
      return {
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        themeTopY:[],
        getThemeTopY:null,
        isTrue:false,
				message:'',
				isShow:false
      }
    },
    created() {
      //保存传入的id
      this.iid = this.$route.params.iid

      getDetail(this.iid).then(res => {
        const data = res.result
        this.topImages = data.itemInfo.topImages
        //获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        // 创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)
        //保存商品详情的数据
        this.detailInfo = data.detailInfo
        //获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        //获取评论的信息
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }
      })

      getRecommend().then(res => {
        this.recommends = res.data.list
      })
      //获取offsetTop
      //created不行 会出现组件还没被创建但函数已经执行的问题 获取不到值
      //mounted不行 dom已经渲染但数据可能没有完全加载 获取的值都是不准确的
      //$nextTick不行 图片高度没有计算在内
      this.getThemeTopY = debounce(() =>{
        this.themeTopY=[]
        this.themeTopY.push(0)
        this.themeTopY.push(this.$refs.params.$el.offsetTop)
        this.themeTopY.push(this.$refs.comment.$el.offsetTop)
        this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
      },100)
    },
    methods:{
      titleClick(index){
        this.$refs.scroll.scrollTo(0,-this.themeTopY[index],300)
      },
      detailImageLoad(){
        this.$refs.scroll && this.$refs.scroll.refresh()
        this.getThemeTopY()
      },
      contentscroll(position){
        const positionY = -position.y
        if(positionY>this.themeTopY[0]&&positionY<this.themeTopY[1]){
          this.$refs.nav.currentIndex = 0
        }else if(positionY>=this.themeTopY[1]&&positionY<this.themeTopY[2]){
          this.$refs.nav.currentIndex = 1
        }else if(positionY>=this.themeTopY[2]&&positionY<this.themeTopY[3]){
          this.$refs.nav.currentIndex = 2
        }else if(positionY>=this.themeTopY[3]){
          this.$refs.nav.currentIndex = 3
        }
				this.isTrue = (-position.y) > 1000
      },
      topClick(){
        this.$refs.scroll.scrollTo(0,0)
      },
      addCart(){
        //获取商品信息
        const product = {}
        product.iid = this.iid
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
				
        this.$store.dispatch('addCart',product).then(res =>{
					this.isShow=true
					this.message=res
					setTimeout(()=>{
						this.isShow=false
						this.message=''
					},1000)
				})

      }
    }

  }
</script>

<style scoped>
 #detail {
    position: relative;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top:44px;
    bottom:52px;
    left:0;
    right:0;
  }
</style>
