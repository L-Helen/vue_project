<template>
  <div class="foodratings">
    <div class="rating-type border-1px">
      <span @click="select(2,$event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span class="nums">( {{ratings.length}} )</span></span>
      <span @click="select(0,$event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="nums">( {{positives.length}} )</span></span>
      <span @click="select(1,$event)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span class="nums">( {{negatives.length}} )</span></span>
    </div>
    <div @click="toggleContent($event)" class="swith" :class="{'on':onlyContent}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<script type="ecmascript-6">
import BScroll from 'better-scroll'
  const POSITIVE = 0
  const NEGATIVE = 1
  const ALL = 2

  export default {
    // 需要引入外部的数据有ratings，seletcType，onlyContent，desc
    props: {
      'data': Object,
      'ratings': {  // ratings需要检验，直接['ratings']会报错，接收不到ratings
        type: Array,
        default() {
          return []
        }
      }
    },
    data () {
      return {
          detailShow: false,
          selectType: ALL,
          onlyContent: false,
          desc: {
               all: '全部',
               positive: "满意",
               negative: "不满意"
          }
        }
    },
    computed: {
      positives () {
        return this.ratings.filter((data) => {
          return data.rateType == POSITIVE
        })
      },
      negatives () {
        return this.ratings.filter((data) => {
          return data.rateType == NEGATIVE
        })
      }
    },
    mounted () {
      // console.log(this.data)
      // console.log(this.ratings)
      this.changed()
    },
    methods: {
      changed () { // 把从父组件接收过来的数据改成自有的，否则后面$emit是会报错
          this.selectType = this.data.selectType
          this.onlyContent = this.data.onlyContent
          if(this.data.desc){
            this.desc = this.data.desc
          }
      },
      select(type,event) {
        if (!event._constructed){
          return;
        }
        this.selectType = type
        this.$emit('typeSelect', type)
        // 向组件外派发事件ratingtype.select，把type值传出去，这样才能修改父组件中的selectType，根据子组件中的选择来更新
      },
      toggleContent (event) {
        if (!event._constructed){
          return;
        }
        this.onlyContent = !this.onlyContent
        this.$emit('isOnly', this.onlyContent)
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
 @import '../../assets/stylus/mixin.styl'
  .rating-type
    margin 12px 18px 0 18px
    padding-bottom 18px
    border-1px(rgba(7,17,27,0.1))
    font-size 0
    .block
      display inline-block
      padding 8px 12px
      margin-right 8px
      border-radius 1px
      font-size 12px
      line-height 16px
      color rgb(77,85,93)
      .nums
        font-size 8px
        margin-left 4px
      &.active
        color #fff
      &.positive
        background-color rgba(0,160,220,0.2)
        &.active
          background-color rgb(0,160,220)
      &.negative
        background-color rgba(77,85,93,0.2)
        &.active
          background-color rgb(77,85,93)

  .swith
    padding 12px 18px
    line-height 24px
    border-bottom 1px solid rgba(7,17,27,0.1)
    color rgb(147,153,149)
    font-size 0
    &.on
      .icon-check_circle
        color #00c850
    .icon-check_circle,.text
      display inline-block
      vertical-align top
    .icon-check_circle
      margin-right 4px
      font-size 24px
    .text
      font-size 12px





</style>

