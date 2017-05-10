<template>
  <div class="headerBox">
    <img :src="seller.avatar" class="bgPic" width="100%" height="100%"  />
    <div class="header">
      <div class="imgBox">
       <img :src="seller.avatar" width="64" height="64" alt="avater图片" />
      </div>
      <div class="content">
        <h3><span class="brand"></span>{{seller.name}}</h3>
        <p>{{seller.description}} / {{seller.deliveryTime}}分钟送达</p>
        <p v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>{{seller.supports[0].description}}
        </p>
      </div>
      <div v-if="seller.supports" class="moreSupport"  @click="showDetail">
        <a href="javascript:;">优惠( <span>{{seller.supports.length}}</span> )</a>
      </div>
      </div>
    <div class="bulletin"  @click="showDetail">
      <b></b>{{seller.bulletin}}<i class="icon-keyboard_arrow_right"></i>
    </div>
    <transition name='fade'>
      <div class="detailBox" v-show="popups">
        <div class="detailMain">
          <div class="detail">
            <h1>{{seller.name}}</h1>
            <div class="starBox">
              <star :size="36" :score="seller.score"></star>
            </div>
            <div class="titleGroup">
                <div class="line"></div>
                <div class="text">优惠信息</div>
                <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supportsList">
              <li v-for="(item ,index) in seller.supports" class="supItem">
                <span class="icon" :class='classMap[seller.supports[index].type]'></span>
                <span class="supText">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="titleGroup">
                <div class="line"></div>
                <div class="text">商家公告</div>
                <div class="line"></div>
            </div>
            <div class="detailBulletin">
               <p class="text">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detailClose" @click="popups=!popups">
          <span class="icon-close"></span>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import star from '@/components/star/Star.vue'

  export default {
    props: ['seller'],
    data () {
      return {
        popups: false    // 弹出层默认不显示
      }
    },
    methods: {
      showDetail () {
        this.popups = true
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
    },
    components: {
      'star': star
    }

  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../assets/stylus/mixin.styl'
  .headerBox
    color #fff
    position relative
    background-color rgba(7,17,27,0.5)
    overflow:hidden
    .bgPic
      position absolute
      top 0
      left 0
      z-index:-1
      filter:blur(10px)
    .header
      padding:24px 0 18px 24px
      font-size:0
      position:relative
      .imgBox,.content
        display: inline-block
        vertical-align middle
      .imgBox
        margin-right:16px
        img
          border-radius: 2px
      .content
        h3
          font-size :16px
          font-weight bold
          line-height 18px
          margin:2px 0 8px
        .brand
          display:inline-block
          width:30px
          height:18px
          background pink
          margin-right:6px
          vertical-align:top
          bg-img('brand')
          background-size 30px 18px
        p
          font-size 12px
          line-height 12px
        :nth-child(3)
          margin-top:10px
          font-size 10px
          .icon
            width 12px
            height 12px
            display: inline-block
            vertical-align top
            margin-right 4px
            background-size 12px 12px
            background-color #ccc
            &.decrease
              bg-img('decrease_1')
            &.discount
              bg-img('discount_1')
            &.guarantee
              bg-img('guarantee_1')
            &.invoice
              bg-img('invoice_1')
            &.special
              bg-img('special_1')
      .moreSupport
        position:absolute
        right 10px
        bottom 15px
        font-size 10px
        line-height 24px
        padding 0 8px
        background-color rgba(0,0,0,0.2)
        border-radius 24px
        &>a
          color #fff
        & span
          color #F01717
    .bulletin
      position relative
      padding:0 22px 0 12px
      height 28px
      background rgba(7,17,27,0.2)
      line-height 28px
      font-size 10px
      color #fff;
      text-overflow ellipsis
      overflow hidden
      white-space nowrap
      &>b
        width 22px
        height 12px
        margin-right: 4px
        margin-top 8px
        display inline-block
        vertical-align top
        bg-img('bulletin')
        background-size 22px 12px
      .icon-keyboard_arrow_right
        position absolute
        right 6px
        line-height 28px
        font-size 16px
        color #fff
    .detailBox
      position fixed
      top 0
      left 0
      z-index 100
      width 100%
      height 100%
      overflow:auto
      background-color  rgba(7,17,27,0.8)
      backdrop-filter:blur(10px)
      transition: all 0.4s ease
      &.fade-enter-active
        opacity 1
      &.fade-enter,&.fade-leave-active
        opacity 0
        background-color  rgba(7,17,27,0.2)
      .detailMain
        min-height:100%
        margin-top:64px
        padding-bottom:64px
        .detail
          h1
            font-size 16px
            font-weight 700
            line-height 16px
            text-align center
          .starBox
            margin-top:16px
            line-height:24px
          .titleGroup
            display:flex
            width 80%
            margin 28px auto 24px
            .line
              flex:1
              position relative
              top -6px
              border-bottom 1px solid rgba(255,255,255,0.2)
            .text
              padding 0 12px
              font-size 14px
              font-weight 700
          .supportsList
            width 80%
            margin 0 auto
            .supItem
              padding 0 12px
              margin-bottom 12px
              font-size 0
              &:last-child
                margin-bottom 0
              .icon
                display inline-block
                width 16px
                height 16px
                vertical-align top
                margin-right 6px
                background-size 16px 16px
                &.decrease
                  bg-img('decrease_2')
                &.discount
                  bg-img('discount_2')
                &.guarantee
                  bg-img('guarantee_2')
                &.invoice
                  bg-img('invoice_2')
                &.special
                  bg-img('special_2')
              .supText
                line-height 16px
                font-size 12px
          .detailBulletin
              width 80%
              margin 0 auto
              .text
                padding 0 12px
                font-size 12px
                line-height 24px
      .detailClose
        position:relative
        margin-top:-64px
        text-align center
        font-size 32px
        clear:both


















</style>
