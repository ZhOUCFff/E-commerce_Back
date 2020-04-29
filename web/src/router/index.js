import Vue from 'vue'
import VueRouter from 'vue-router'

//路由懒加载
const Login = () => import('views/login/Login')
const Home = () => import('views/home/Home')
const Welcome = () => import('views/home/childCpns/Welcome')
const UserList = () => import('views/home/childCpns/user/UserList')
const Rights = () => import('views/home/childCpns/power/Rights')
const Roles = () => import('views/home/childCpns/power/Roles')
const Categories = () => import('views/home/childCpns/goods/Categories')
const Params = () => import('views/home/childCpns/goods/Params')
const Goods = () => import('views/home/childCpns/goods/Goods')
const Add = () => import('views/home/childCpns/goods/Add')
const OrderList = () => import('views/home/childCpns/order/OrderList')
const Report = () => import('views/home/childCpns/report/Report')


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '/',
        redirect: '/users'
      },
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/users',
        component: UserList
      },
      {
        path: '/rights',
        component: Rights
      },
      {
        path: '/roles',
        component: Roles
      },
      {
        path: '/categories',
        component: Categories
      },
      {
        path: '/params',
        component: Params
      },
      {
        path: '/goods',
        component: Goods,
      },
      {
        path: '/goods/add',
        component: Add
      },
      {
        path: '/orders',
        component: OrderList
      },
      {
        path: '/reports',
        component: Report
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  //to代表将要访问的路径
  //from代表从哪个路径跳转而来
  //next是一个函数，表示放行
  if (to.path === '/login') return next()
  const token = window.sessionStorage.getItem('token')
  if (!token) return next('/login')
  next()
})

export default router