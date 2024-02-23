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
      path: '/labs',
      children: [
        {
          path: 'cycloid',
          name: 'cycloid',
          component: () => import('../views/labs/CycloidView.vue'),
        },
        {
          path: 'epicycloid',
          name: 'epicycloid',
          component: () => import('../views/labs/EpicycloidView.vue'),
        },
        {
          path: 'hypocycloid',
          name: 'hypocycloid',
          component: () => import('../views/labs/HypocycloidView.vue'),
        },
        {
          path: 'mandelbrot-fractal',
          name: 'mandelbrot-fractal',
          component: () => import('../views/labs/MandelbrotView.vue'),
        },
      ]
    }
  ],
});

export default router;
