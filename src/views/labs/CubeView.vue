<script setup lang="ts">

import CanvasRoot from '@/components/common/CanvasRoot.vue';
import { onMounted } from 'vue';
import { CubeScene } from '@/scenes/cube.scene';

const scene: CubeScene = new CubeScene("#cube-app");

onMounted(() => {
  scene.setup();
  scene.start();
});

</script>

<template>
  <div>
    <CanvasRoot id="cube-app"></CanvasRoot>
  </div>
</template>

<style scoped>

</style>