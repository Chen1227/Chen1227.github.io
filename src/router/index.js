import { createRouter, createWebHashHistory } from 'vue-router'

const Home = () => import('view/home/Home')
const Category = () => import('view/category/Category')
const Shopcart = () => import('view/shopcart/Shopcart')
const Profile = () => import('view/profile/Profile')
const Detail = () => import('view/detail/Detail')

const routes = [
  {
    path:'/',
    redirect:'/home',
    meta:{show:true}
  },
  {
    path:'/home',
    component:Home,
    meta:{show:true}
  },
  {
    path:'/category',
    component:Category,
    meta:{show:true}
  },
  {
    path:'/shopcart',
    component:Shopcart,
    meta:{show:true}
  },
  {
    path:'/profile',
    component:Profile,
    meta:{show:true}
  },
  {
    path:'/detail/:iid',
    component:Detail
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
