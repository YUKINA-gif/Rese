import Vue from "vue";
import VueRouter from "vue-router";
import StoreList from "../views/StoreList.vue";
import MyPage from "../views/MyPage.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import Thanks from "../views/Thanks.vue";
import Done from "../views/Done.vue";
import StoreDetail from "../views/StoreDetail.vue";
import store from "../store/index";
import NotFound from '../views/NotFound.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "StoreList",
    component: StoreList,
  },
  {
    path: "/mypage",
    name: "MyPage",
    component: MyPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/done",
    name: "Done",
    component: Done,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/thanks",
    name: "Thanks",
    component: Thanks,
  },
  {
    path: "/detail/:id",
    name: "StoreDetail",
    component: StoreDetail,
    props: true,
  },
  {
    path: "*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !store.state.auth
  ) {
    next({
      path: "/login",
      query: {
        redirect: to.fullPath,
      },
    });
  } else {
    next();
  }
});

export default router;
