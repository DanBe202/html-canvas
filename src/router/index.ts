import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '@/views/DashboardView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/labs/cycloid',
      name: 'cycloid',
      component: () => import('../views/labs/CycloidView.vue'),
    },
    {
      path: '/labs/epicycloid',
      name: 'epicycloid',
      component: () => import('../views/labs/EpicycloidView.vue'),
    },
    {
      path: '/labs/hypocycloid',
      name: 'hypocycloid',
      component: () => import('../views/labs/HypocycloidView.vue'),
    },
  ],
});

export default router;
