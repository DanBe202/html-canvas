<script setup lang="ts">

import ControlsPanel from '@/components/common/ControlsPanel.vue';
import CanvasRoot from '@/components/common/CanvasRoot.vue';
import ModalWindow from '@/components/common/ModalWindow.vue';
import { onMounted, ref } from 'vue';
import { MandelbrotEnhancedScene } from '@/scenes/mandelbrot-enhanced.scene';

let scene: MandelbrotEnhancedScene = new MandelbrotEnhancedScene(
  '#mandelbrot-fractal-app',
);
const infoModal = ref<InstanceType<typeof ModalWindow> | null>(null);

onMounted(() => {
  scene.setup();
});
</script>

<template>

  <div class="grid gap-4 grid-cols-1 lg:grid-cols-6">
    <CanvasRoot
      class="lg:col-span-4"
      id="mandelbrot-fractal-app">
    </CanvasRoot>
    <ControlsPanel
      class="lg:col-span-2"
      :started="scene.processing"
      @start="scene.start()"
      @stop="scene.stop()"
      @reset="scene.reset()"
      @info="infoModal?.open()">
    </ControlsPanel>
    <ModalWindow ref="infoModal">
    </ModalWindow>
  </div>
</template>

<style scoped>

</style>