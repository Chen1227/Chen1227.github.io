<template>
	<div class="shopcart">
		<nav-bar class="cart-nav">
		  <template v-slot:center>购物车({{length}})</template>
		</nav-bar>
		<scroll class="content" ref="scroll" :probeType="3">
			<cart-list/>
		</scroll>
		<cart-bottom-bar></cart-bottom-bar>
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar'
	import CartList from './childComps/CartList'
	import CartBottomBar from './childComps/CartBottomBar'
	import Scroll from 'components/common/scroll/Scroll'
	import { mapGetters } from 'vuex'
	
	export default{
		name:'Shopcart',
		components:{
			NavBar,
			CartList,
			CartBottomBar,
			Scroll
		},
		computed:{
			//...mapGetters(['cartLength'])
			...mapGetters({
				length:'cartLength'
			})
		},
		activated(){
			this.$refs.scroll.refresh()
		}
	}
</script>

<style scoped>
	.shopcart{
		height: 100vh;
	}
	
	.cart-nav{
		background-color: var(--color-tint);
		color: #fff;
	}
	
	.content{
	  overflow: hidden;
		height: calc(100% - 133px);
	}
</style>
