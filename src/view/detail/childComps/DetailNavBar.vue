<template>
  <div>
    <nav-bar>
      <template v-slot:left>
        <div class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" />
        </div>
      </template>
      <template v-slot:center>
        <div class="title">
          <div v-for="(item,index) in titles"
          class="title-item"
          :class="{active:index === currentIndex}"
          @click="titleClick(index)">{{item}}</div>
         </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      titleClick(index) {
        this.currentIndex = index
        this.$emit('titleClick',index)
      },
      backClick() {
        this.$router.back()
      }
    }
  }
</script>


<style scoped>
  .back img {
      margin-top: 13px;
    }

  .title{
    display: flex;
    font-size: 13px;
  }

  .title-item{
    flex:1
  }

  .active{
    color: var(--color-high-text);
  }
</style>
