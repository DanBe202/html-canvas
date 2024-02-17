<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppLink from '@/components/common/AppLink.vue';
</script>

<template>
  <div class="drawer">
    <div class="drawer-content flex flex-col">
      <div class="w-full navbar bg-base-300">
        <AppLink
          class="flex-1 px-2 mx-2"
          to="/">
          Graphics Labs
        </AppLink>
      </div>
      <div class="container mx-auto py-8 px-4">
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>
