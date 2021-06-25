<template>
  <!-- 必须判断传入参数是否为0 -->
  <div v-if="Object.keys(detailInfo).length !== 0" class="detail-goods">
    <div class="info-desc">{{detailInfo.desc}}</div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="goods-img">
      <img v-for="(item,index) in detailInfo.detailImage[0].list" :key="index" :src="item" @load="imageLoad">
    </div>
  </div>
</template>

<script>
	export default {
		name: "DetailGoodsInfo",
    props: {
      detailInfo: {
        type: Object,
        default(){
          return {}
        }
      }
    },
    methods:{
      imageLoad(){
        this.$emit('detailImageLoad')
      }
    }

	}
</script>

<style scoped>
  .detail-goods{
    padding-bottom: 20px;
    border-bottom: 5px solid #eee;
    font-size: 14px;
  }
  .info-desc{
    padding: 20px 10px;
  }
  .info-key{
    padding: 10px;
  }
  .goods-img img{
    width: 100%;
  }
</style>
