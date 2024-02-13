<script setup lang="ts">
import {RouterView } from 'vue-router';
</script>

<template>
  <div class="drawer">
    <div class="drawer-content flex flex-col">
      <!-- Navbar -->
      <div class="w-full navbar bg-base-300">
        <a class="flex-1 px-2 mx-2" id="page-title" href="/">Navbar Title</a>
      </div>
      <!-- Page content here -->
      <div class="container mx-auto py-8">
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
