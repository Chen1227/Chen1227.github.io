<template>
  <div class="bottom-bar">
    <div class="bottom">
      <div>
        <i class="icon service"></i>
        <span>客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span>店铺</span>
      </div>
      <div>
        <i class="icon collect"></i>
        <span>收藏</span>
      </div>
    </div>
    <div class="bottom bottom-right">
      <div class="right cart" @click="addCart">加入购物车</div>
      <div class="right buy">购买</div>
    </div>
  </div>
</template>

<script>
  export default{
    name:'DetailBottomBar',
    methods:{
      addCart(){
        this.$emit('addToCart')
      }
    }
  }
</script>

<style>
  .bottom-bar{
    height: 52px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    display: flex;
    text-align: center;
  }
  .bottom{
    flex: 1;
    display: flex;
  }
  .bottom span{
    font-size: 13px;
  }
  .bottom>div{
    flex: 1;
  }
  .bottom-right{
    display: flex;
  }
  .bottom-right .right{
    flex: 1;
  }
  .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 7px auto 2px;
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
  }
  .service {
    background-position:0 -51.5px;
  }
  .shop {
    background-position:0 -97px;
  }
  .collect {
    background-position:0 -148px;
  }
  .bottom-right{
    font-size: 15px;
    color: #fff;
    line-height: 52px;
  }
  .cart{
    background-color: #ffe817;
    color: #333;
  }
  .buy{
    background-color: #f69;
  }
</style>
