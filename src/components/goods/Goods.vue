<template>
  <div  class="goods">
    <div class="menu-wrap" ref='menuWrap'>
      <ul>
        <li v-for='(item,index) in goods' class="menu-item" @click="selectMenu(index, $event)" :class="{'current':currentIndex===index}">
          <span class="text" border-1px>
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]">
            </span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrap" ref='foodsWrap'>
      <ul>
        <li v-for="(goodItem,index) in goods" class="foodList food-list-hook">
            <h2 class="title">{{goodItem.name}}</h2>
            <ul>
              <li v-for="(food,index) in goodItem.foods" class="foodItem"
                  @click="selectFood(food,$event)">
                <div class="icon">
                  <img width="57" :src="food.icon">
                </div>
                <div class="content">
                  <h3 class="name">{{food.name}}</h3>
                  <p class="desc">{{food.description}}</p>
                  <p class="extra">
                    <span class="count">月售{{food.sellCount}}</span>
                    <span>好评率{{food.rating}}%</span>
                  </p>
                  <p class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </p>
                </div>
                <div class="cartConWrap">
                    <cartcontrol :food="food" @addCount="_drop" @cartAdd="_drop"></cartcontrol>
                  </div>
              </li>
             </ul>
        </li>
      </ul>
    </div>
    <shopcart ref='shopcart' :dePrice="seller.deliveryPrice"
              :minPrice="seller.minPrice"
              :selectFoods="selectFoods">
    </shopcart>
    <foodsdetail :food="selectedFood" ref='detail' @cartAdd="_drop" @detailAdd="_drop"></foodsdetail>

  </div>
</template>
<script type="ecmascript-6">
  import BScroll from 'better-scroll'
  import Vue from 'vue'
  import shopcart from '@/components/shopCart/Shopcart.vue'
  import cartcontrol from '@/components/cartControl/Cartcontrol.vue'
  import foodsdetail from '@/components/foodsdetail/foodsdetail.vue'
  import dataJson from "@/data/data.json"

  export default {
    props: ['seller', 'classMap'],
    data () {
      return {
        goods: [],
        listHeight: [],
        scrolly: 0,
        selectedFood: {}
      }
    },
    computed: {
      currentIndex () { // 算出屏幕滚动后对应左边菜单的哪一项，默认是第0项
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrolly >= height1 && this.scrolly < height2)) {
            return i
          }
        }
        return 0
      },
      selectFoods () {  // 没问题
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }

          })
        })
        // console.log(foods)
        return foods
      }
    },
    mounted () {
       this.getGoodsData()
       // this._initScroll()
       // this.calulateHeight()

    },
    methods: {
      // getAddCount (target) {
      //       console.log(target)
      //       this._drop(target)
      //  },
      getGoodsData () {
        // var _this = this
        // this.$http.get('static/data/data.json').then((res) => {
        //   _this.goods = res.data.goods
        //   _this.$nextTick(() => {
        //       _this._initScroll()
        //       _this.calulateHeight()
        //   })
        // })
        this.goods = dataJson.goods
        this.$nextTick(() => {
          this._initScroll()
          this.calulateHeight()
         })
      },
      _initScroll () {
        this.menuScroll = new BScroll(this.$refs.menuWrap, {
          click: true  // 如果删掉, menuWrap中对点击事件则没有反应
        })
        this.foodsScroll = new BScroll(this.$refs.foodsWrap, {
          click: true, // 如果删掉, cartcontrol组件中对点击事件则没有反应
          probeType: 3
        })
        this.foodsScroll.on('scroll', (pos) => { // 监听Y轴的滚动数值 取正整
          this.scrolly = Math.abs(Math.round(pos.y))
        })
      },
      calulateHeight () { // 用来算出右侧每项item的高度
        let foodList = this.$refs.foodsWrap.getElementsByClassName('food-list-hook')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
       },
      selectMenu (index, event) {
        if (!event._constructed) {
          return
        }// 根据event._constructed判断来当前是否PC端，不是的话就return回去，不执行click事件，不然会重复，_constructed 自定义派发事件
        let foodList = this.$refs.foodsWrap.getElementsByClassName('food-list-hook')
        let elm = foodList[index]
        this.foodsScroll.scrollToElement(elm, 300)
      },
      selectFood (food, event) {
        if (!event._constructed) {
          return
        }
        this.selectedFood = food
        // console.log(this.selectedFood)
        this.$refs.detail.show()
      },
      _drop (target) {
        // console.log(target)
        this.$nextTick(() => { // 为了优化，异步执行购物车小球下落动画
          this.$refs.shopcart.drop(target)
          // 访问子组件 执行子组件的drop()函数
        })
      }
    },
    components: {
      shopcart,
      cartcontrol,
      foodsdetail
    },
    // events: { // 接收从cartcontrol addCount() 派发出来的事件"cart.add"
    //   'cart.add' (target) {
    //     console.log(target)
    //     this._drop(target)
    //   }
    //  }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../assets/stylus/mixin.styl'
  .goods
    display:flex
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrap
      flex: 0 0 80px
      width:80px
      background-color #f3f5f7
      .menu-item
        display:table
        height: 54px
        width 56px
        padding:0 12px
        line-height 14px
        font-size 0
        &.current
          position relative
          z-index 10
          margin-top -1px
          background-color #fff
          font-weight 700
          .text:after
            border none
        .text
          display table-cell
          width 56px
          vertical-align middle
          border-1px(rgba(7,17,27,0.2))
          font-size 12px
          .icon
            width 12px
            height 12px
            display: inline-block
            margin-right:2px
            vertical-align top
            background-size 12px 12px
            &.decrease
              bg-img('decrease_3')
            &.discount
              bg-img('discount_3')
            &.guarantee
              bg-img('guarantee_3')
            &.invoice
              bg-img('invoice_3')
            &.special
              bg-img('special_3')
    .foods-wrap
      flex:1
      .title
        padding-left 14px
        height 26px
        line-height 26px
        border-left 2px solid #d9dde1
        font-size 12px
        color:rgb(147,153,159)
        background-color #f3f5f7
      .foodItem
        position:relative
        display:flex
        margin:18px
        padding-bottom 18px
        border-1px(rgba(7,17,27,0.1))
        &:last-child:after
          border:none;
          margin-bottom: 0
        .icon
          flex:0 0 57px
          margin-right:10px
        .content
          flex:1
          .name
            margin 2px 0 8px 0
            height 14px
            line-height 14px
            font-size 14px
            color rgb(7,17,27)
          .desc,.extra
            line-height 10px
            font-size 10px
            color rgb(147,153,159)
          .desc
            margin-bottom 8px
            line-height 12px
          .extra
            &.count
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
        .cartConWrap
          position absolute
          right 0
          bottom 0












</style>
