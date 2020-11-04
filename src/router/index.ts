import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '@/views/Home.vue';
import Register from '@/views/Register.vue';
import Login from '@/views/Login.vue';
import Cart from '@/views/Cart.vue';
import Coupon from '@/views/Coupon.vue';
import Store from '@/views/Store.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  },
  {
    path: '/coupon',
    name: 'Coupon',
    component: Coupon,
  },
  {
    path: '/store/:storeId',
    props: true,
    name: 'Store',
    component: Store,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
