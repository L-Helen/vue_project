<template>
  <div id='app'>
    <v-header :seller="seller"></v-header>
    <ul class="tab border-1px">

      <router-link to="/Goods" tag="li" class="tab-item" >
       <a href="javascript:;">商品</a>
      </router-link>
      <router-link to="/Ratings" tag="li" class="tab-item">
        <a href="javascript:;">评价</a>
      </router-link>
       <router-link to="/Seller" tag="li" class="tab-item">
          <a href="javascript:;">商家</a>
       </router-link>

    </ul>
    <keep-alive>
     <router-view :seller="seller" :classMap="classMap"></router-view>
    </keep-alive>
  </div>
</template>

<script type="ecmascript-6">
import Header from '@/components/header/Header'
import dataJson from "@/data/data.json"

export default {
  data () {
    return {
      seller: {},
      classMap:['decrease', 'discount', 'guarantee', 'invoice', 'special']
    }
  },
  components: {
    'v-header': Header
  },
  mounted () {
     this.getData()
  },
  methods: {
    getData () {
       // var _this = this
       // this.$http.get('static/data/data.json').then(function (res) {
       //       // console.log(res.data)  ?id=' + this.seller.id
       //       _this.seller = res.data.seller
       //        // _this.seller = Object.assign({}, _this.seller, res.data.seller)
       // }).catch( (err) => {
       //    console.log(err)
       // })
       this.seller = dataJson.seller
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './assets/stylus/mixin.styl'
    .tab
      display:flex
      width:100%
      height:40px
      line-height :40px
      border-1px(rgba(7,17,27,0.1))
      .tab-item
        flex:1
        text-align:center
        &.active a
           color rgb(240,20,20)
        a
          display:block
          font-size:14px
          color:rgb(77,85,93)








</style>
