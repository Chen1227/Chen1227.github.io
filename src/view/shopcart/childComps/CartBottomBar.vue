<template>
	<div class="cart-bar">
		<div class="check-content">
			<check-button :is-checked="isSelectAll" class="select-all" @click.native="checkClick"/>
			<span>全选</span>
		</div>
		<div class="total-price">合计：{{totalPrice}}</div>
		<div class="cacluate">去计算：({{cartLength}})</div>
	</div>
</template>

<script>
	import CheckButton from 'components/content/checkButton/CheckButton'
	
	export default{
		name:'CartBottomBar',
		components:{
			CheckButton
		},
		computed:{
			totalPrice(){
				return '￥' + this.$store.state.cartList.filter(item => item.checked
				).reduce((preValue,item) => {
					return preValue + item.price * item.count
				},0).toFixed(2)
			},
			cartLength(){
				return this.$store.state.cartList.filter(item => item.checked).length
			},
			isSelectAll(){
				if(this.$store.state.cartList.length === 0) return false
				return !(this.$store.state.cartList.find(item => !item.checked))
			}
		},
		methods:{
			checkClick(){
				if(this.isSelectAll){
					this.$store.state.cartList.forEach(item => item.checked = false)
				}else{
					this.$store.state.cartList.forEach(item => item.checked = true)
				}
				
			}
		}
	}
</script>

<style>
	.cart-bar{
		position: relative;
		display: flex;
		height: 40px;
		background-color: #eee;
		box-shadow: 0 -2px 3px rgba(0, 0, 0, .1);
		font-size: 14px;
		color: #888;
		line-height: 40px;
	}
	
	.check-content{
		display: flex;
		align-items: center;
		margin-left: 10px;
		width: 60px;
	}
	
	.select-all{
		width: 20px;
		height: 20px;
		line-height: 20px;
		margin-right: 5px;
	}
	
	.total-price{
	  margin-left: 15px;
		flex: 1;
	}
	
	.cacluate{
		width: 90px;
		background-color: orangered;
		color: #fff;
		font-size: 15px;
		text-align: center;
	}
</style>
