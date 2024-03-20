<script setup lang="ts">

import CanvasRoot from '@/components/common/CanvasRoot.vue';
import { computed, onMounted, ref } from 'vue';
import { BezierSurfaceScene } from '@/scenes/bezier-surface.scene';
import { Vector } from '@/scenes/common/math/vector';

const scene: BezierSurfaceScene = new BezierSurfaceScene("#bezier-app");

const cell = ref(1);
const cells = computed(() => new Vector([cell.value + 10, cell.value + 20]));

onMounted(() => {
  scene.setup();
  scene.start();
  setInterval(() => {
    cell.value = (cell.value + 1) % 10;
    scene.changeSurface(cells.value);
  }, 1000);
});

</script>

<template>
  <div>
    <CanvasRoot id="bezier-app"></CanvasRoot>
  </div>
</template>

<style scoped>

</style>