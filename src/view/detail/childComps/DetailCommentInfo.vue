<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <div class="comment-head">
      <div class="head-title">用户评价</div>
      <div class="head-more">更多</div>
    </div>

    <div class="comment-user">
      <img :src="commentInfo.user.avatar"/>
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="comment-detail">
      <p>{{commentInfo.content}}</p>
      <div class="comment-other">
        <span class="comment-date">{{showDate(commentInfo.created)}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
    </div>
    <div class="comment-imgs">
      <img :src="item" v-for="item in commentInfo.images"/>
    </div>
  </div>
</template>

<script>
  import {formatDate} from "common/utils"

  export default{
    name:'DetailCommentInfo',
    props:{
      commentInfo:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    methods:{
      showDate (value){
        const date = new Date(value * 1000)
        return formatDate(date,'yyyy-MM-dd hh:mm:ss')
      }
    }
  }
</script>

<style>
  .comment-info{
    padding: 5px 12px;
    color: #333;
    border-bottom: 5px solid #F2F5F8;
  }

  .comment-head{
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }

  .head-title{
    float: left;
    font-size: 15px;
  }

  .head-more{
    float: right;
    margin-right: 10px;
    font-size: 13px;
  }

  .comment-user{
    padding: 10px 0 5px;
  }

  .comment-user img{
    height: 42px;
    width: 42px;
    border-radius: 50%;
  }

  .comment-user span{
    position: relative;
    font-size: 15px;
    top: -15px;
    margin-left: 10px;
  }

  .comment-detail{
    padding: 0 5px 15px;
  }

  .comment-detail p{
    font-size: 14px;
    color: #777;
    line-height: 1.5;
  }

  .comment-detail .comment-other{
    font-size: 12px;
    color: #999;
    margin-top: 7px;
  }

  .comment-other .comment-date{
    margin-right: 10px;
  }

  .comment-imgs{
    margin-top: 10px;
  }

  .comment-imgs img{
    width: 80px;
    height: 100px;
    margin-right: 5px;
  }
</style>
