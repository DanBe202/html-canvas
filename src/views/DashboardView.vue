<script setup lang="ts">

import DashboardCard from '@/components/dashboard/DashboardCard.vue';
import { ref } from 'vue';

const cards = ref([
  {
    title: "Cycloid",
    description: "Animation of a cycloid",
    link: "/labs/cycloid"
  },
  {
    title: "Epicycloid",
    description: "Animation of a epicycloid",
    link: "/labs/epicycloid"
  },
  {
    title: "Hypocycloid",
    description: "Animation of a hypocycloid",
    link: "/labs/hypocycloid"
  }
]);
</script>

<template>
  <div class="grid grid-cols-4 gap-2">
    <DashboardCard v-for="card in cards"
                   :title="card.title"
                   :link="card.link"
                   :description="card.description"
                   :key="card.link"></DashboardCard>
  </div>
</template>

<style scoped>

</style>