<template>
	<div class="check-button" :class="{check:isChecked}">
		<img src="~assets/img/cart/tick.svg">
	</div>
</template>

<script>
	export default{
		name:'CheckButton',
		props:{
			isChecked:{
				type:Boolean,
				default:true
			}
		}
	}
</script>

<style>
	.check-button{
		border-radius: 50%;
		border: 2px solid #aaa;
	}
	
	.check{
		border-color: #ff0000;
		background-color: #ff0000;
	}
</style>
