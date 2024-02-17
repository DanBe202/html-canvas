<script setup lang="ts">
import AppLink from '@/components/common/AppLink.vue';

interface Props {
  title: string;
  description: string;
  link: string;
  image: string;
}

defineProps<Props>();
</script>

<template>
  <div class="card card-compact bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
    <figure>
      <img
        :src="image"
        :alt="title" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{{ title }}</h2>
      <p>{{ description }}</p>
      <div class="card-actions justify-end">
        <AppLink
          :to="link"
          class="btn btn-primary px-8">
          Open
        </AppLink>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
