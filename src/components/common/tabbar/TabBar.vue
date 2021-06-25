<template>
	<div id="tab-bar">
		<slot></slot>
	</div>
	
</template>

<script>
</script>

<style>
	#tab-bar{
		display: flex;
		position: fixed;
		background-color: #f6f6f6;
		left:0;
		right:0;
		bottom:0; 
		box-shadow: 0px -1px 1px rgba(100,100,100,.09);
	}

</style>
