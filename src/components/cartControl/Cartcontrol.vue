<template>
  <div class="cartControl">
    <transition name="move">
      <span @click.stop.prevent="minusCount"  class="minus" v-show="food.count>0">
          <span class="inner icon-remove_circle_outline"></span>
      </span>
    </transition>
    <span class="count" v-show="food.count>0">{{food.count}}</span>
    <span class="add icon-add_circle" @click.stop.prevent="addCount"></span>
  </div>
</template>
<script type="ecmascript-6">
import Vue from "vue"
  export default {
    props: ['food'],
    methods: {
      addCount (event) {
        if (!event._constructed){
          return
        }
        // console.log('click') 检测每点击一次是否会多打印，理由点击一次打印一次
        if (!this.food.count) { // 如果food对象没有count属性，
          Vue.set(this.food, 'count', 1) // 给food对象设置count属性，并设值为1
          // 对于DOM一开始不存在的数据设值，需要在当前组件中引入全局Vue,
          // 然后用Vue.set(对象，'属性名'，‘属性值’) 如:Vue.set(this.food, 'count', 1)
        } else { // food对象已有count属性的话 就count++
          this.food.count ++
        }
        // console.log(this)
        // console.log(this.food.count)
        // this.$dispatch('cart.add', event.target)
        this.$emit('addCount', event.target)
      },
      minusCount () {
        if (!event._constructed){
          return
        }
        if (this.food.count) {
          this.food.count --
        }
      }

    }
    // created () {
    //   console.log(this.food) // 查看从父组件传过来的food对象有没有数据
    // }

  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .cartControl
    font-size: 0
    .minus
      display inline-block
      padding 6px
      transition: all 0.4s linear
      .inner
        display inline-block
        line-height: 24px
        font-size: 24px
        color rgb(0,160,220)
        transition: all 0.4s linear
        transform: rotate(0)
      &.move-enter-active
        opacity 1
        transform:translate3d(0,0,0)
      &.move-enter,&.move-leave-active
        opacity 0
        transform: translate3d(26px,0,0)
        .inner
         transform:rotate(180deg)
    .count
      display inline-block
      line-height: 24px
      width 12px
      padding-top 6px
      vertical-align top
      font-size 10px
      text-align center
      color rgb(147,153,159)
    .add
      display inline-block
      line-height: 24px
      padding 6px
      font-size: 24px
      color rgb(0,160,220)
</style>
