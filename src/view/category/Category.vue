<template>
	<div id="category">
		<nav-bar class="category-nav">
		  <template v-slot:center>商品分类</template>
		</nav-bar>
		<div class="category-content">
			<category-menu :menu-list="categories" @selectItem="selectItem" />
			<scroll :probe-type="3" class="category-scroll" ref="scroll" @scroll="contentscroll">
				<category-sub-content :sub-category="subCategory" @subCategoryImgLoad="subCategoryImgLoad"/>
				<tab-control :titles="['综合', '新品', '销量']" @tabClick="tabClick"/>
				<category-sub-detail :category-detail="categoryDetail" />
			</scroll>
		</div>
		 <back-top @click.native="topClick" v-show="isTrue" />
	</div>
</template>

<script>
	import CategoryMenu from './childComps/CategoryMenu'
	import CategorySubContent from './childComps/CategorySubContent'
	import TabControl from 'components/content/tabControl/TabControl'
	import categorySubDetail from './childComps/CategorySubDetail'
	
	import NavBar from 'components/common/navbar/NavBar'
	import Scroll from 'components/common/scroll/Scroll'
	import BackTop from 'components/content/backTop/BackTop'
	
	import {getCategory,getSubcategory,getCategoryDetail} from 'network/category'
	import {debounce} from 'common/utils'
	
	export default {
    name:'category',
    components: {
			NavBar,
			CategoryMenu,
			Scroll,
			CategorySubContent,
			TabControl,
			categorySubDetail,
			BackTop
    },
    data() {
			return {
				categories:[],
				categoryData:{},
				currentIndex:-1,
				currentType:'pop',
				isTrue:false
			}
		},
		methods: {
			getCategory(){
				getCategory().then(res => {
					//获取左侧数据
					this.categories = res.data.category.list
					//初始化右侧数据
					for (let index = 0; index < this.categories.length; index++) {
						//数据模型
						this.categoryData[index] = {
							//子分类数据
							subcategoryies:{},
							//子详情数据
							categoryDetail:{
								'pop':[],
								'new':[],
								'sell':[]
							}
						}
					}
					//第一个子类数据不点击也需要请求
					this.getSubcategory(0)
				})  
			},
			getSubcategory(index){
				this.currentIndex = index
				const maitKey = this.categories[index].maitKey
				getSubcategory(maitKey).then(res => {
					// console.log(res);
					//获取当前分类的subcategoryies
					this.categoryData[index].subcategoryies = res.data.list
					this.getCategoryDetail('pop')
					this.getCategoryDetail('new')
					this.getCategoryDetail('sell')
				})
			},
			getCategoryDetail(type){
				const miniWallkey = this.categories[this.currentIndex].miniWallkey
				getCategoryDetail(miniWallkey,type).then(res => {
					//subCategoryiesDetail.type 是一个新属性 subCategoryiesDetail[type]是已有属性
					this.categoryData[this.currentIndex].categoryDetail[type] = res
				})
			},
			subCategoryImgLoad(){
				const refresh = debounce(() => {
						this.$refs.scroll && this.$refs.scroll.refresh()
				},50)
				refresh()
			},
			//根据点击的分类获取不同的数据
			selectItem(index){
				this.getSubcategory(index)
			},
			 //根据选项卡切换数据
			tabClick(index){
				switch(index){
					case 0:
						this.currentType = 'pop'
						break
					case 1:
						this.currentType = 'new'
						break
					case 2:
						this.currentType = 'sell'
						break
				}
			},
			topClick(){
			  this.$refs.scroll.scrollTo(0,0)
			},
			contentscroll(position){
			  this.isTrue = (-position.y) > 1000
			}
		},
		computed:{
			subCategory(){
				if(this.currentIndex === -1) return{} 
				return this.categoryData[this.currentIndex].subcategoryies
			},
			categoryDetail(){
				if (this.currentIndex === -1) return []
				return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
			}
		},
		created() {
			this.getCategory()
		}
}
</script>
<style scoped>
	#category{
		height: 100vh;
	}
	
	.category-nav{
	  background-color: var(--color-tint);
	  color:#fff;
	  position: fixed;
	  left:0;
	  right:0;
	  top:0;
	  z-index: 9;
	}
	
	.category-content{
		overflow: hidden;
		position: absolute;
		top:44px;
		bottom: 49px;
		left:0;
		right:0;
		display: flex;
	}
	
	.category-scroll{
		height: 100%;
		flex: 1;
	}
</style>