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
          path: 'mandelbrot',
          name: 'mandelbrot',
          component: () => import('../views/labs/MandelbrotView.vue'),
        },
        {
          path: 'mandelbrot-enhanced',
          name: 'mandelbrot-enhanced',
          component: () => import('../views/labs/MandelbrotEnhancedView.vue'),
        },
        {
          path: 'cube',
          name: 'cube',
          component: () => import('../views/labs/CubeView.vue'),
        },
        {
          path: 'bezier',
          name: 'bezier',
          component: () => import('../views/labs/BezierSurfaceView.vue'),
        },
      ]
    }
  ],
});

export default router;
