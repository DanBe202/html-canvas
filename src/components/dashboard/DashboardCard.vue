<script setup lang="ts">
import { useRouter } from 'vue-router';

interface Props {
  title: string;
  description: string;
  link: string;
}

defineProps<Props>();

const router = useRouter();

</script>

<template>
  <div class="card bg-primary text-primary-content">
    <div class="card-body">
      <h2 class="card-title">{{title}}</h2>
      <p>{{description}}</p>
      <div class="card-actions justify-end">
        <button class="btn" @click="router.push(link)">Open</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>