<template>
  <div class="sub-category">
    <grid-view :cols="3" :lineSpace="15" :v-margin="20" v-if="subCategory">
			<div v-for="item in subCategory" :key="item" class="item">
				<a :href="item.link">
					<img :src="item.image" @subCategoryImgLoad="subCategoryImgLoad">
					<div class="item-text">{{item.title}}</div>
				</a>
			</div>
		</grid-view>
  </div>
</template>

<script>
	import GridView from 'components/common/gridview/GridView.vue'
	export default {
		components:{
			GridView 
		},
		props:{
			subCategory:{
				type:Object,
				default(){
					return []
				}
			}
		},
		methods:{
			subCategoryImgLoad(){
				this.$emit('subCategoryImgLoad')
			}
		}
	}
</script>

<style scoped>
	.sub-category{
		background-color:white;
	}
	.item{
		text-align: center;
		font-size: 13px;
	}
	.item img{
		width: 80%;
	}
	.item-text{
		margin-top: 15px;
	}
</style>
