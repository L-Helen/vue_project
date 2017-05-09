<template>
  <div class="ratings">
    <div class="ratings-content" >
      <div class="overview">
        <div class="viewLeft">
          <h1 class="score">{{seller.score}}</h1>
          <p class="title">综合评分</p>
          <p class="rank">高于周边商家{{seller.rankRate}}</p>
        </div>
        <ul class="viewRight">
          <li class="score-wrap">
            <span class="title">服务态度</span>
            <star class="star" :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </li>
          <li class="score-wrap">
            <span class="title">商品评分</span>
            <star class="star" :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </li>
          <li class="score-wrap">
            <span class="title">送达时间</span>
            <span class="deliveryTime">{{seller.deliveryTime}}分钟</span>
          </li>
        </ul>
      </div>
      <split></split>
      <foodratings :data="giveData" :ratings="ratings" @typeSelect="getChildSel" @isOnly="getIsOnly">
      </foodratings>
      <div class="ratings-list">
        <ul>
          <li v-show="needShow(item.rateType,item.text)" v-for="item in ratings"  class="ratingItem border-1px">
            <div class="avatar">
              <img :src="item.avatar" width="28" height="28">
            </div>
            <div class="content">
              <h1 class="name">{{item.username}}</h1>
              <div class="star-wrap">
                <star :size="24" :score="item.score"></star>
                <span class="delivery" v-show="item.deliveryTime">
                  {{item.deliveryTime}}分钟送达
                </span>
              </div>
              <p class="text">{{item.text}}</p>
              <div class="recommend" v-show="item.recommend &&item.recommend.length">
                <i class="icon-thumb_up"></i>
                <span v-for="recItem in item.recommend"
                  class="recItem">
                  {{recItem}}
                </span>
              </div>
              <span class="time">{{item.rateTime | formatDate}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="ecmascript-6">
import BScroll from 'better-scroll'
import star from '@/components/star/Star.vue'
import split from '@/components/split/split.vue'
import foodratings from '@/components/foodRating/Foodratings.vue'
import {formatDate} from '@/assets/js/date.js'
import dataJson from "@/data/data.json"
  const ALL= 2
  export default {
    props: ['seller'],
    data () {
      return {
        ratings: [],
        giveData: {
          selectType: ALL,
          onlyContent: false
        }
      }
    },
    methods: {
      needShow (type, text) {
        if (this.giveData.onlyContent && !text) {
          return false
          this.$nextTick(() => { //等DOM更新后才能动态计算scroll
            this.scroll.refresh()
          })
        }
        if (this.giveData.selectType === ALL) {
          return true
        } else {
          return type === this.giveData.selectType
          this.$nextTick(() => { //等DOM更新后才能动态计算scroll
            this.scroll.refresh()
          })
        }
      },
      getChildSel (data) { //接收从Foodratings派发出来的事件, 修改相关数据
        // console.log(this)
        // console.log(type+','+data)
        this.giveData.selectType = data
        // console.log(this.giveData.selectType)
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      getIsOnly (data) { //接收从Foodratings派发出来的事件, 修改相关数据
        // console.log(this)
        // console.log(type+','+data)
        this.giveData.onlyContent = data
        // console.log(this.giveData.onlyContent)
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      }
    },
    filters: {
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    created () {
      // var _this = this
      // this.$http.get('static/data/data.json').then((res) => {
      //   // console.log(res)
      //   _this.ratings = res.data.ratings
      //   _this.$nextTick(() => {
      //     if (!_this.scroll) {
      //       _this.scroll = new BScroll(this.$refs.ratings, {
      //         click: true
      //       })
      //     } else {
      //         _this.scroll.refresh()
      //       }
      //   })
      // })
      this.ratings = dataJson.ratings
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$el, {
            click: true
          })
        } else {
            this.scroll.refresh()
          }
      })
    },
    components: {
      star,
      split,
      foodratings
    }
  }

</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../assets/stylus/mixin.styl'
  .ratings
    position absolute
    top 174px
    bottom 0 // 此处bottom的定位是必须的，否则引用BScroll时会出错
    left 0
    width 100%
    overflow hidden
    .overview
      display flex
      padding 18px 0
      .viewLeft
        flex: 0 0 137px
        width: 137px
        padding 6px 0
        border-right 1px solid rgba(7,17,27,0.2)
        text-align center
        @media only screen and (max-width 320px)
          flex: 0 0 110px
          width: 110px
        .score
          margin-bottom 6px
          lhfz-rgb(28px,24px,rgb(255,153,0))
        .title
          margin-bottom 8px
          lhfz-rgb(12px,12px,rgb(7,17,27))
        .rank
          padding-bottom 6px
          lhfz-rgb(10px,10px,rgb(147,153,159))
      .viewRight
        flex 1
        padding 6px 0 6px 24px
        @media only screen and (max-width 320px)
          padding-left 6px
        .score-wrap
          margin-bottom 8px
          font-size 0
          .title,.star,.score
            inlineBlock()
          .title
            lhfz-rgb(18px,12px,rgb(7,17,27))
          &>.star
            margin 0 12px
          .score
            lhfz-rgb(18px, 12px, rgb(255,153,0))
          .deliveryTime
            margin-left 12px
            lhfz-rgb(18px,12px,rgb(147,153,159))
    .ratings-list
      padding 0 18px
      .ratingItem
        display flex
        padding 18px 0
        border-1px(rgba(7,17,27,0.1))
        .avatar
          flex  0 0 28px
          width 28px
          margin-right 12px
          img
            border-radius 50%
        .content
          position relative
          flex 1
          .name
            margin-bottom 4px
            lhfz-rgb(12px,10px,rgb(7,17,27))
          .star-wrap
            margin-bottom 6px
            font-size 0
            .stars
              margin-right 6px
              inlineBlock()
            .delivery
              inlineBlock()
              lhfz-rgb(12px,10px,rgb(147,153,159))
          .text
            margin-bottom 8px
            lhfz-rgb(16px,12px,rgb(7,17,27))
          .recommend
            line-height 16px
            font-size 0
            .icon-thumb_up,.recItem
              inlineBlock()
              margin 0 8px 4px 0
            .icon-thumb_up
              lhfz-rgb(16px,12px,rgb(0,160,220))
            .recItem
              padding 0 6px
              border 1px solid rgba(7,17,27,0.1)
              border-radius 1px
              lhfz-rgb(16px, 10px,rgb(147,153,159))
              background-color #fff
          .time
            position absolute
            top 0
            right 0
            lhfz-rgb(12px, 10px,rgb(147,153,159))










</style>

