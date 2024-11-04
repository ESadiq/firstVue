import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Orders from '../views/Orders.vue';
import Wishlist from '../views/Wishlist.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/orders', component: Orders },
  { path: '/wishlist', component: Wishlist },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
