import Vue from 'vue'
import VueRouter from 'vue-router';
import Storelist from '../views/Storelist.vue';
import Mypage from '../views/Mypage.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Thanks from '../views/Thanks.vue';
import Booked from '../views/Booked.vue';
import StoreDetail from '../views/StoreDetail.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Storelist',
    component: Storelist
  },
  {
    path: '/mypage',
    name: 'Mypage',
    component: Mypage
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/done',
    name: 'Booked',
    component: Booked
  },
  {
    path: '/thanks',
    name: 'Thanks',
    component: Thanks
  },
  {
    path: '/detail/:id',
    name: 'StoreDetail',
    component: StoreDetail
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
