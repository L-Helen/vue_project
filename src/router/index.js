import Vue from 'vue'
import Router from 'vue-router'

// import App from '../App.vue'
import Goods from '@/components/goods/Goods'
import Ratings from '@/components/ratings/Ratings'
import Seller from '@/components/seller/Seller'
// import foodsdetail from '@/components/foodsdetail/foodsdetail'
// import Hello from '@/components/Hello'

Vue.use(Router)

 const router = new Router({
  linkActiveClass: 'active',
  routes: [
    // {
    //   path: '/',
    //   component: App
    // },

    {
      path: '/',
      redirect: '/Goods'
    },
    {
      path: '/Goods',
      component: Goods

    },
    {
      path: '/Ratings',
      component: Ratings
    },
    {
      path: '/Seller',
      component: Seller
    }

  ]
})
router.push('/Goods') // 刷新后默认跳转切换到goods页面
export default router
