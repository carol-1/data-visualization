import Vue from 'vue'
import VueRouter from 'vue-router'
import SellerPage from '@/views/SellerPage'
import TrendPage from '@/views/TrendPage'


Vue.use(VueRouter)

const routes = [{
        path: '/Sellerpage',
        component: SellerPage //这是所找到的组件，这个组件会呈现在app.vue中要在app.vue中加载
    },
    {
        path: '/TrendPage',
        component: TrendPage //这是所找到的组件，这个组件会呈现在app.vue中要在app.vue中加载
    }

]

const router = new VueRouter({
    routes
})

export default router