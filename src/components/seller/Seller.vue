<template>
  <div class='seller' >
    <div class="seller-content">
      <div class="view">
       <h1 class="title">{{seller.name}}</h1>
       <div class="desc border-1px">
         <star :size="36" :score="seller.score"></star>
         <span class="text">({{seller.ratingCount}})</span>
         <span class="text">月售{{seller.sellCount}}单</span>
       </div>
       <ul class="remark">
         <li class="block">
           <h2>起送价</h2>
           <div class="content">
             <span class="stress">{{seller.minPrice}}</span>元
           </div>
         </li>
         <li class="block">
           <h2>商家配送</h2>
           <div class="content">
             <span class="stress">{{seller.deliveryPrice}}</span>元
           </div>
         </li>
         <li class="block">
           <h2>平均配送时间</h2>
           <div class="content">
             <span class="stress">{{seller.deliveryTime}}</span>分钟
           </div>
         </li>
       </ul>
        <div class="favorite" @click="toggleFavorite">
          <span class="icon-favorite" :class="{'active':favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="text-wrap border-1px">
          <p class="text">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supportsList">
          <li v-for="(item,index) in seller.supports" class="supItem border-1px">
            <span class="icon" :class='classMap[seller.supports[index].type]'></span>
            <span class="supText">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrap" ref='listWrap'>
          <ul class="picList" ref='picList'>
            <li class="picItem" v-for="pic in seller.pics">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title border-1px">商家信息</h1>
        <ul>
         <li class="infoItem border-1px" v-for="item in seller.infos">{{item}}
         </li>
        </ul>
      </div>
     </div>
  </div>
</template>
<script type="ecmascript-6">
import BScroll from 'better-scroll'
import {saveToLocal, loadFromlLocal} from '@/assets/js/store.js'
import star from '@/components/star/Star.vue'
import split from '@/components/split/split.vue'

export default {
  props:['seller', 'classMap'],
  data () {
    return {
      favorite: (() => {
          return loadFromlLocal(this.seller.id, 'favorite', false)
      })()
      // favorite: (() = > {
      //   return loadFromlLocal(this.seller.id, 'favorite', false)
      // })()
    }
  },
  computed: {
    favoriteText () {
      return this.favorite ? '已收藏' : '收藏'
    }
  },
  // watch: {  // 监听seller数据有没有，有了就执行
  //   'seller' () {
  //     this._intScroll ()
  //     this._intPiclistWidth ()
  //   }
  // },
  mounted() {
     this._intScroll ()
     this._intPiclistWidth ()
  },
  methods: {
    toggleFavorite () {
      if (!event._constructed) {
        return
      } else {
        this.favorite = !this.favorite
        // console.log(this.seller.id)
        saveToLocal(this.seller.id, 'favorite', this.favorite)
        //存储商家id到localStorage
      }
    },
    _intScroll () {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$el, {
          click:true
        })
      } else {
        this.scroll.refresh()
      }
    },
    _intPiclistWidth () {
      if (this.seller.pics) {
      let liWidth = 120
      let mg = 6
      let width = (liWidth + mg) * this.seller.pics.length - mg
      this.$refs.picList.style.width =  width + 'px'
      this.$nextTick(() => {
        if (!this.picScroll) {
          this.picScroll = new BScroll(this.$refs.listWrap, {
            scrollX: true,
            eventPassthrough: 'vertical'
          })
        } else {
          this.picScroll.refresh()
        }
      })
     }
    }
  },

  // created () {
  //     this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']

  // },
  components: {
    star,
    split
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
 @import '../../assets/stylus/mixin.styl'
  .seller
    position absolute
    top 174px
    bottom 0
    left 0
    width 100%
    overflow hidden
    .view
      position relative
      padding 18px
      .title
        margin-bottom 8px
        lhfz-rgb(14px,14px,rgb(7,17,27))
      .desc
        padding-bottom  18px
        border-1px(rgba(7,17,27,0.1))
        font-size 0
        .stars
          margin-right 8px
          inlineBlock()
        .text
          margin-right 12px
          inlineBlock()
          lhfz-rgb(18px,10px,rgb(77,85,93))
      .remark
        display flex
        padding 18px 0
        .block
          flex 1
          text-align center
          border-right 1px solid rgba(7,17,27,0.1)
          &:last-child
            border:none
          h2
            margin-bottom 4px
            lhfz-rgb(10px,10px,rgb(147,153,159))
          .content
            lhfz-rgb(24px,10px,rgb(7,17,27))
            .stress
              font-size 24px
      .favorite
        position absolute
        right 12px
        top 18px
        width 50px
        text-align center
        color
        .icon-favorite
          display block
          margin-bottom 8px
          lhfz-rgb(24px,24px,#d4d6d9)
          &.active
            color rgb(240,20,20)
        .text
          lhfz-rgb(10px,10px,rgb(77,85,93))
    .bulletin
      padding 18px 18px 0 18px
      .title
        margin-bottom 8px
        lhfz-rgb(14px,14px,rgb(7,17,27))
      .text-wrap
        padding 0 12px 16px
        border-1px(rgba(7,17,27,0.1))
        .text
          // font:12px/24px rgb(240,20,20)
          lhfz-rgb(24px,12px,rgb(240,20,20))
      .supportsList
        .supItem
          padding 16px 12px
          font-size 0
          border-1px(rgba(7,17,27,0.1))
          &:last-child
            border-none()
          .icon
            margin-right 6px
            inlineBlock()
            width 16px
            height 16px
            background-size 16px 16px
            &.decrease
              bg-img('decrease_4')
            &.discount
              bg-img('discount_4')
            &.guarantee
              bg-img('guarantee_4')
            &.invoice
              bg-img('invoice_4')
            &.special
              bg-img('special_4')
          .supText
            lhfz-rgb(16px,12px,rgb(7,17,27))
    .pics
      padding 18px
      .title
        margin-bottom 12px
        lhfz-rgb(14px,14px,rgb(7,17,27))
      .pic-wrap
        overflow hidden
        white-space nowrap
        .picList
          font-size 0
          .picItem
            display inline-block
            margin-right 6px
            width 120px
            height 90px
            &:last-child
              margin: 0
    .info
      padding 18px 18px 0 18px
      color rgb(7,17,27)
      .title
        padding-bottom 12px
        border-1px(rgba(7,17,27,0.1))
        font-size 14px
      .infoItem
        padding 16px  12px
        line-height 16px
        font-size 12px
        border-1px(rgba(7,17,27,0.1))
        &:last-child:after
          border:none
</style>
