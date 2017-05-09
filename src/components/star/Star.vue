<template>
  <div class="stars" :class="starType">
    <span class="star"  v-for="(itemCls,index) in clsArr" :class="itemCls"></span>
  </div>
</template>
<script type="text/javascript">
  // const cls_on = 'on'
  // const cls_half = 'half'
  // const cls_off = 'off'
  export default {
    props: ['size', 'score'],
    computed: {
        starType () {
          return 'star-' + this.size
        },
        clsArr () { // 获取到scope,来分别处理star的个数和3种状态的个数
          let clsArr = [] // 用来装star,装够5个
          let score = Math.floor(this.score * 2) / 2  // 对scope向下取整
          let intS = Math.floor(score) // 下取整 算出有整数是几
          let half = score % 1 !== 0   // 半数只应有一个
          for (let i = 0; i < intS; i++) {
            clsArr.push('on')      // 每一个整数就添加一个On状态的类
          }
          if (half) {
            clsArr.push('half')
          }
          while (clsArr.length < 5) {  // 如果
            clsArr.push('off')
          }
          return clsArr
          }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../assets/stylus/mixin.styl'
  .stars
    font-size 0
    text-align:center
    .star
      display:inline-block
  .star-48
    .star
      width 20px
      height 20px
      margin-right 22px
      background-size 20px 20px
      &:last-child
        margin-right 0
      &.on
          bg-img('star48_on')
      &.half
          bg-img('star48_half')
      &.off
          bg-img('star48_off')
  .star-36
    .star
      width 15px
      height 15px
      margin-right 6px
      background-size 15px 15px
      &:last-child
        margin-right 0
      &.on
          bg-img('star36_on')
      &.half
          bg-img('star36_half')
      &.off
          bg-img('star36_off')
  .star-24
    .star
      width 10px
      height 10px
      margin-right 3px
      background-size 10px 10px
      &:last-child
        margin-right 0
      &.on
          bg-img('star24_on')
      &.half
          bg-img('star24_half')
      &.off
          bg-img('star24_off')


</style>
