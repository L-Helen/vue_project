<template>
  <div id='shopCart'>
    <div class="shopCart">
      <div class="content" @click="toggleCartList">
        <div class="shopLeft">
          <div class="cartWrap">
            <div class="cart" :class="{'highlight':totalCount>0}">
              <i class="icon-shopping_cart highlight" :class="{'highlight':totalCount>0}"></i>
            </div>
            <div class="count" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <span class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</span>
          <span class="desc">另需配送费￥{{dePrice}} 元</span>
        </div>
        <div class="shopright" @click.stop.prevent="goPay">
          <div class="pay" :class="{'calculate': totalPrice>=minPrice}">
            {{payDesc}}
          </div>
        </div>
      </div>
      <div class="ballBox">
        <transition-group tag='ul' name='drop'
        @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter"
        >
          <li v-for="(ball,index ) in balls" v-show="ball.show"  class="ball" :key='index'>
            <div class="inner ball-hook"></div>
          </li>
        </transition-group>
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="cartListShow">
          <div class="list-header">
            <h2 class="title">购物车</h2>
            <span class="empty" @click="emptyCartList">清空</span>
          </div>
          <div class="list-content" ref='cartList'>
            <ul>
              <li class="foodlist" v-for='food in selectFoods'>
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="cartcontrolWrap">
                  <cartcontrol :food="food" @addCount="drop"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
       <div class="cartlist-bgBlur" v-show="cartListShow" @click="fold=true">
       </div>
    </transition>
  </div>
</template>

<script type="ecmascript-6">
  import BScroll from 'better-scroll'
  import cartcontrol from '@/components/cartControl/Cartcontrol.vue'

  export default {
     props: { // 从父组件接收3个数据 dePrice，minPrice，selectFoods
      dePrice: {
        default: 0,
        type: Number
      },
      minPrice:  {
        default: 0,
        type: Number
      },
      selectFoods: {
        type: Array,
        default () {
          return [
            // {price: 20, count: 2}  // 设数据为了看效果
          ]
        }
      }
     },
     data () {
      return {
        balls: [
          {show: false},
          {show: false},
          {show: false},
          {show: false},
          {show: false}
        ],
        dropBalls: [],
        fold: true  // 折叠
      }
     },
     computed: {
      totalPrice () { // 已选商品的总价
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        return total
      },
      totalCount () { // 已选商品的总数量
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      payDesc () { // 处理总额的样式状态
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice
          return `还差￥${diff}元起送`
        } else {
          return `去结算`
        }
      },
      cartListShow () {
        if (!this.totalCount) { // 如果没有购物数量
          this.fold = true  // 列表折叠起来,不展开
          return false
        }
        let show = !this.fold
        if (show) {
          this.$nextTick(() => { // 初始化scroll
            if (!this.scroll){
              this.scroll = new BScroll(this.$refs.cartList, {
                click: true
              })
            } else {
              this.scroll.refresh()
            }
          })
        }
        return show
      }
     },
     methods: {
      drop (el) {
       for(let i = 0; i<this.balls.length; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBalls.push(ball)
          // console.log(this.dropBalls)
          return
        }
       }
      },
      toggleCartList () {
        if (!this.totalCount) {
          return
        }
        this.fold = !this.fold
      },
      emptyCartList () {
        this.selectFoods.forEach((food) => {
          food.count = 0
        })
      },
      goPay () {
        if (this.totalPrice < this.minPrice) {
          return
        }
        window.alert(`支付${this.totalPrice}元`)
      },
      beforeEnter (el) {
          let count = this.balls.length
          while (count--) {
            let ball = this.balls[count]
            if (ball.show) {
              let rect = ball.el.getBoundingClientRect() // 获得ball相对视口的位置
              let x = rect.left - 32
              let y = -(window.innerHeight - rect.top - 22)
              el.style.display = ''
              el.style.webkitTransform =  `translate3d(0,${y}px,0)`
              el.style.transform = `translate3d(0,${y}px,0)`
              let inner = el.getElementsByClassName('ball-hook')[0]
              inner.style.webkitTransform = `translate3d(${x}px,0,0)`
              inner.style.transform = `translate3d(${x}px,0,0)`
            // console.log('beforeEnter'+el.x+','+el.y)
            }
          }
      },
      enter (el) {
           /* eslint-disable no-unused-vars */
          let rf = el.offsetHeight
          this.$nextTick(() => {
              el.style.webkitTransform = 'translate3d(0,0,0)'
              el.style.transform = 'translate3d(0,0,0)'
              let inner = el.getElementsByClassName('ball-hook')[0]
              inner.style.webkitTransform = 'translate3d(0,0,0)'
              inner.style.transform = 'translate3d(0,0,0)'
           // console.log('Enter'+el.style.transform +el.className)
          })
      },
      afterEnter (el) {
          let ball = this.dropBalls.shift()
          if (ball) {
            ball.show = false
            el.style.display = 'none'
          }
          // console.log('afterEnter'+el.style.display)
        }
     },
     // transitions: {
     //  drop: {
     //    // afterEnter (el) {
     //    //   let ball = this.dropBalls.shift()
     //    //   if (ball) {
     //    //     ball.show = false
     //    //     el.style.display = 'none'
     //    //   }
     //    //   // console.log('afterEnter'+el.style.display)
     //    // }
     //  }
    // },
    components: {
      cartcontrol
    }
}

</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../assets/stylus/mixin.styl'
.shopCart
  position fixed
  left 0
  bottom 0
  z-index 50
  width 100%
  height 48px
  .content
    display flex
    background-color #141d27
    font-size 0
    color rgba(255,255,255,0.4)
    .shopLeft
      flex 1
      .cartWrap, .price, .desc
        display:inline-block
        vertical-align top
      .cartWrap
        position relative
        top -10px
        margin 0 10px
        padding 6px
        width  56px
        height 56px
        box-sizing:border-box
        border-radius 50%
        background-color #141d27
        .cart
          width 100%
          height 100%
          border-radius 50%
          text-align center
          background-color #2b343c
          &.highlight
            background-color rgb(0,160,220)
          .icon-shopping_cart
            line-height 44px
            font-size 24px
            color #80858a
            &.highlight
              color #fff
        .count
          position absolute
          top 0
          right 0
          width 22px
          line-height 20px
          text-align center
          border-radius 50%
          font-size 9px
          font-weight 700
          color #fff
          background-color rgb(240,20,20)
          box-shadow 0 4px 8px 0 rgba(0,0,0,0.4)
      .price,.desc
        line-height 24px
        margin-top 12px
      .price
        box-sizing border-box
        padding-right 10px
        border-right 1px solid rgba(255,255,255,0.1)
        font-size 16px
        font-weight 700
        &.highlight
          color #fff
      .desc
        padding-left 12px
        font-size 10px
    .shopright
      flex 0 0 105px
      width 105px
      margin-left 5px
      .pay
        height 48px
        line-height 48px
        text-align center
        font-size 12px
        font-weight 700
        background-color #2b333b
        &.calculate
          background-color #00b43c
          color #fff
  .ballBox
    .ball
      position fixed
      left 32px
      bottom 22px
      z-index 100
      &.drop-enter-active,&drop-leave-active
       transition: all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41)
      .inner
        width 16px
        height 16px
        border-radius 50%
        background-color  rgb(0,160,220)
        transition: all 0.4s linear
  .shopcart-list
    position absolute
    top 0
    left 0
    z-index -1
    width 100%
    transform translate3d(0,-100%,0)
    &.fold-enter-active,&.fold-leave-active
      transition all 0.5s ease
    &.fold-enter-active
      transform translate3d(0,-100%,0)
    &.fold-enter,&.fold-leave-active
      transform translate3d(0,0,0)
    .list-header
      height 40px
      line-height 40px
      padding 0 18px
      background-color #f3f5f7
      border-bottom 2px solid rgba(7,17,27,0.1)
      .title
        float left
        font-size 14px
        color rgb(7,17,27)
      .empty
        float right
        font-size 12px
        color rgb(0,160,220)
    .list-content
      padding 0 18px
      max-height 217px
      background-color #fff
      overflow hidden
      .foodlist
        position relative
        padding 12px 0
        box-sizing border-box
        border-1px(rgba(7,17,27,0.1))
        .name
          line-height 24px
          font-size 14px
          color rgb(7,17,27)
        .price
          position absolute
          right 90px
          bottom 12px
          line-height 24px
          font-weight 700px
          color rgb(240,20,20)
        .cartcontrolWrap
          position absolute
          right 0
          bottom 6px
.cartlist-bgBlur
  position fixed
  top 0
  left 0
  z-index 30
  width 100%
  height 100%
  background-color: rgba(7,17,27,0.7)
  backdrop-filter blur(10px)
  &.fade-enter-active,&.fade-leave-active
    transition all 0.5s
  &.fade-enter-active
    opacity 1
  &.fade-enter,&.fade-leave-active
    opacity 0
    background-color rgb(7,17,27)






</style>
