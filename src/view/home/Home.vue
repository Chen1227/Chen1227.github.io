<template>
	<div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>购物街</template>
    </nav-bar>

    <scroll class="content" ref="scroll" @scroll="contentscroll" :probeType="3" :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick"/>
      <good-list :goods="showGoods"/>
    </scroll>

    <back-top @click.native="topClick" v-show="isTrue"/>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import TabControl from 'components/content/tabControl/TabControl'
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  import GoodList from 'components/content/goods/GoodsList'
  import BackTop from 'components/content/backTop/BackTop'

  import {getHomemultidata,getHomeGoods} from 'network/home'


  export default{
    name:"Home",
    data(){
      return {
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]}
        },
        Type:['pop','new','sell'],
        currentType:'pop',
        isTrue:false,
        saveY:0
      }
    },
    components:{
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodList,
      Scroll,
      BackTop
    },
    created() {
      //1.请求更多数据
      this.getHomemultidata()

      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    activated() {
      this.$refs.scroll.scroll.refresh()
      this.$refs.scroll.scrollTo(0,this.saveY,2)
    },
    deactivated() {
      this.saveY = this.$refs.scroll.scroll.y
    },
    computed:{
      showGoods(){
        return this.goods.[this.currentType].list
      }
    },
    methods:{
      tabClick(index){
        this.currentType=this.Type.[index]
      },
      topClick(){
        this.$refs.scroll.scrollTo(0,0)
      },
      contentscroll(position){
        this.isTrue = (-position.y) > 1000
      },
      loadMore(){
        this.getHomeGoods(this.currentType)
      },

      getHomemultidata(){
        getHomemultidata().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page+=1

          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home{
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }

  .home-nav{
    background-color: var(--color-tint);
    color:#fff;
    position: fixed;
    left:0;
    right:0;
    top:0;
    z-index: 9;
  }

 .content{
    overflow: hidden;
    position: absolute;
    top:44px;
    bottom: 49px;
    left:0;
    right:0;
  }

/*  .content{
    height: calc(100% - 93px);
    overflow: hidden;
  } */

</style>
