<script setup lang="ts">
import DashboardCard from '@/components/dashboard/DashboardCard.vue';
import { ref } from 'vue';

const cards = ref([
  {
    title: 'Cycloid',
    description: 'Animation of a cycloid',
    link: '/labs/cycloid',
    image: '/labs/cycloid.png',
  },
  {
    title: 'Epicycloid',
    description: 'Animation of a epicycloid',
    link: '/labs/epicycloid',
    image: '/labs/epicycloid.png',
  },
  {
    title: 'Hypocycloid',
    description: 'Animation of a hypocycloid',
    link: '/labs/hypocycloid',
    image: '/labs/hypocycloid.png',
  },
  {
    title: 'Mandelbrot fractal',
    description: 'Showcase of the beautiful mMandelbrot fractal',
    link: '/labs/mandelbrot',
    image: '/labs/mandelbrot.png',
  },
  {
    title: 'Cube animation',
    description: 'Showcase of a rotating cube',
    link: '/labs/cube',
    image: '/labs/cube.png',
  },
]);
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    <DashboardCard
      v-for="card in cards"
      :title="card.title"
      :link="card.link"
      :description="card.description"
      :image="card.image"
      :key="card.link"></DashboardCard>
  </div>
</template>

<style scoped></style>
