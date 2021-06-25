<template>
	<div class="toast" v-show="isShow">
		<div>{{message}}</div>
	</div>
</template>

<script>
	export default{
		name:'Toast',
		props:{
			message:{
				type:String,
				default:''
			},
			isShow:{
				type:Boolean,
				default:false
			}
		}
	}
</script>

<style>
	.toast{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		padding: 8px 12px;
		
		color: #fff;
		background-color: rgba(0,0,0,.75);
	}
</style>
