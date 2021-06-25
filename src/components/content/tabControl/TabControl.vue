<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" class="tab-control-item"
    :class="{active:index ===currentIndex}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default{
    name:'TabConrol',
    data(){
      return {
        currentIndex:0
      }
    },
    props:{
      titles:{
        type:Array,
        default:[]
      }
    },
    methods:{
      itemClick(index){
        this.currentIndex = index
        this.$emit('tabClick',index)
      }
    }
  }
</script>

<style>
 .tab-control{
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    background-color: #fff;
  }

  .tab-control-item{
    flex: 1;
  }

  .tab-control-item span{
    padding: 3px;
  }

 .active{
    color: var(--color-high-text);
  }

  .active span{
    border-bottom:4px solid var(--color-tint);
  }
</style>
