<template>
 <transition name='move'>
  <div class="foodDetailBox" v-show="detailShow"  ref='detail'>
    <div class="container">
      <div class="imgBox">
        <img :src="food.image" alt="images"/>
        <span class="back" @click="detailShow=false">
         <i class="icon-arrow_lift"></i>
        </span>
      </div>
      <div class="content">
        <h1 class="title">{{food.name}}</h1>
        <div class="detail">
          <span class="sell-count">月售{{food.sellCount}}份</span>
          <span class="rating">好评率{{food.rating}}%</span>
        </div>
        <div class="price">
          <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
        </div>
        <div class="cartcontrol-wrap">
          <cartcontrol :food="food" @addCount="get($event)"></cartcontrol>
        </div>
        <transition name="fade">
          <div class="buy" @click.stop.prevent="firstAdd($event)" v-show="!food.count || food.count===0">
            加入购物车
          </div>
        </transition>
      </div>
      <split v-show="food.info"></split>
      <div class="info">
        <h1 class="title" v-show="food.info">商品信息</h1>
        <p class="text">{{food.info}}</p>
      </div>
      <split></split>
      <div class="ratingSelect">
        <h1 class="title">商品评价</h1>
        <foodratings :ratings="food.ratings"  :data="giveData" @typeSelect="getChildSel" @isOnly="getIsOnly">
        </foodratings>
        <div class="rating-list">
          <ul v-show="food.ratings && food.ratings.length">
            <li v-show="needShow(item.rateType,item.text)"  v-for="item in food.ratings" class="rating-item">
              <div class="time">{{item.rateTime | formatDate}}</div>
              <p class="text">
                <span
                :class="{'icon-thumb_up':item.rateType===0,
                        'icon-thumb_down':item.rateType===1}">
                </span>{{item.text}}
              </p>

              <div class="user">
                <span class="name">{{item.username}}</span>
                <img class="avater" width="12" :src="item.avatar">
              </div>
            </li>
          </ul>

          <div class="no-rating" v-show="!food.ratings || !food.ratings.length">
            暂无评价
          </div>
        </div>
      </div>

    </div>
  </div>
 </transition>
</template>
<script type="ecmascript-6">
import BScroll from 'better-scroll'
import Vue from 'vue'
import {formatDate} from '../../assets/js/date.js'
import cartcontrol from '@/components/cartControl/Cartcontrol.vue'
import split from '@/components/split/split.vue'
import foodratings from '@/components/foodRating/Foodratings.vue'
// import data from '@/static/data/data.json'

  const ALL = 2
  export default {
    props: ['food'],
    data () {
      return {
        detailShow: false,
        giveData: {
          selectType: ALL,
          onlyContent: false,
          desc: {
              all: '全部',
              positive: "推荐",
              negative: "吐槽"
          }
        }
      }
    },
    mounted () {
      // console.log(this.food)
      // this.getIsOnly()
      // this.getTypeSel()
    },
    methods:  {
      show () { // 会被goods组件调用
        this.detailShow = true
        this.giveData.selectType = ALL
        this.giveData.onlyContent = true
        this.$nextTick( () => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.detail,{
              click: true
            })
          } else {
              this.scroll.refresh()
            }
        })
      },

      firstAdd (event) {
        if (!event._constructed) {
          return
        }
        this.$emit('cartAdd', event.target)
        Vue.set(this.food, 'count', 1)
      },
      needShow (type,text) {
        if (this.giveData.onlyContent && !text) {
          return false
          this.$nextTick(() => { //等DOM更新后才能动态计算scroll
            this.scroll.refresh()
          })

        }
        if (this.giveData.selectType===ALL) {
          return true
        } else {
          return type === this.giveData.selectType
          this.$nextTick(() => { //等DOM更新后才能动态计算scroll
            this.scroll.refresh()
          })
        }
      },
      get (target) { // 购物小球抛物线效果
       this.$emit('detailAdd', target)
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
        let date= new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    components: {
      cartcontrol,
      split,
      foodratings
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../assets/stylus/mixin.styl'
  .foodDetailBox
    position fixed
    left 0
    top 0
    bottom 46px
    z-index 20
    width 100%
    background-color #fff
    &.move-enter-active,&.move-leave-active
      transition all 0.4s linear
    &.move-enter-active
      transform translate3d(0,0,0)
    &.move-enter,&.move-leave-active
      transform translate3d(100%,0,0)
    // &.move-transition
    //   transition all 0.4s linear
    //   transform translate3d(0,0,0)
    // &.move-enter,&.move-leave
    //   transform translate3d(100%,0,0)
    .imgBox
      position relative
      width 100%
      height 0
      padding-top 100% //
      img
        position absolute
        left 0
        top 0
        width 100%
        height 100%
      .back
        position absolute
        top 10px
        left 0
        .icon-arrow_lift
          padding 10px
          font-size 20px
          color #fff
    .content
      position relative
      padding 18px
      .title
        margin-bottom 8px
        lhfz-rgb(14px,14px,rgb(7,17,27))
        font-weight 700
      .detail
        margin-bottom 18px
        line-height 10px
        height 10px
        font-size 0
        .sell-count,.rating
          font-size 10px
          color rgb(147,153,159)
        .sell-count
          margin-right 12px
      .price
        font-weight 700
        line-height  24px
        .now
          margin-right 12px
          font-size 14px
          color rgb(240,20,20)
        .old
          text-decoration:line-through
          font-size 10px
          color rgb(147,153,159)
      .cartcontrol-wrap
        position absolute
        right 12px
        bottom 12px
      .buy
        position absolute
        right 18px
        bottom  18px
        z-index 10
        padding 0 12px
        box-sizing border-box
        border-radius 12px
        lhfz-rgb(24px,10px,#fff)
        background-color rgb(0,160,220)
        transition all 0.3s
        &.fade-enter-active
          opacity 1
        &.fade-enter,&.fade-leave-active
          opacity 0
    .info
      padding 18px
      .title
        margin-bottom 6px
        lhfz-rgb(14px,14px,rgb(7,17,27))
      .text
        padding 0 8px
        lhfz-rgb(24px,12px,rgb(77,85,93))
    .ratingSelect
      .title
        padding 18px 0 6px 18px
        line-height 18px
        font-size 14px
      .rating-list
        padding 0 18px
        .rating-item
          position relative
          padding 16px 0
          border-1px(rgba(7,17,27,0.1))
          .time
            margin-bottom 6px
            lhfz-rgb(12px,10px,rgb(147,153,159))
          .text
            line-height 16px
            font-size 12px
            color rgb(7,17,27)
            .icon-thumb_up,.icon-thumb_down
              margin-right 4px
              line-height 16px
              font-size 12px
            .icon-thumb_up
              color rgb(0,160,220)
            .icon-thumb_down
              color rgb(147,153,159)
          .user
            position absolute
            right 0
            top 16px
            line-height 12px
            font-size 0
            .name
              display inline-block
              margin-right 6px
              vertical-align top
              font-size 10px
              color rgb(147,153,159)
            .avater
              border-radius 50%
    .no-rating
      padding 16px 0
      font-size 12px
      text-align center
      color rgb(147,153,159)










</style>
