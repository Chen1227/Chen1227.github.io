<template>
	<scroll class="contents">
		<div class="menu-list">
		<div class="menu-list-item" v-for="(item,index) in menuList" :key="item" 
		:class="{active: index === currentIndex}" @click="itemClick(index)">
				 {{item.title}}
		</div>
		</div>
	</scroll>
</template>

<script>
	import Scroll from 'components/common/scroll/Scroll'

	export default{
		name:'CategoryMenu',
		data(){
			return {
				currentIndex:0
			}
		},	
		components:{
			Scroll
		},
		props:{
			menuList:{
					type:Array,
					default:[]
			}
		},
		methods:{
			itemClick(index){
				this.currentIndex = index
				this.$emit('selectItem', index)
			}
		}
	}
</script>

<style>
	 .contents{
			width: 100px;
			height: 100%;
			background-color: #eee;
			box-sizing: border-box;
		}
		
		.menu-list{
			text-align: center;
			font-size: 15px;
		}
		.menu-list-item{
			height: 45px;
			line-height: 45px;
		}
		
		.menu-list-item.active{
			background-color: #fff;
			color: #fc5d5d;
			border-left: 5px solid #fc5d5d;
			font-weight: 600;
		}
</style>
