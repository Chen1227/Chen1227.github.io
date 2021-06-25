<template>
	<grid-view>
		<goods-list-item v-for="(item, index) in categoryDetail" :key="index" :goodsItem="item"></goods-list-item>
	</grid-view>
</template>

<script>
	import GridView from 'components/common/gridview/GridView'
	import GoodsListItem from "components/content/goods/GoodsListItem"
	export default{
		name:'categorySubDetail',
		components:{
			GridView,
			GoodsListItem,
		},
		props:{
			categoryDetail:{
				type:Array,
				default(){
					return []
				}
			}
		}
	}
</script>

<style>
</style>