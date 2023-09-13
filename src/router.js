// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import UserList from './components/UserList.vue';
import UserDetails from './components/UserDetails.vue';

const routes = [
  {
    path: '/',
    name: 'UserList',
    component: UserList,
  },
  {
    path: '/user',
    name: 'UserDetails',
    component: UserDetails,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
