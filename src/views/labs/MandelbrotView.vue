<script setup lang="ts">

import ControlsPanel from '@/components/common/ControlsPanel.vue';
import CanvasRoot from '@/components/common/CanvasRoot.vue';
import ModalWindow from '@/components/common/ModalWindow.vue';
import { onMounted, ref } from 'vue';
import { MandelbrotScene } from '@/scenes/mandelbrot.scene';
import InputGroup from '@/components/common/InputGroup.vue';

const minX = ref(-2.0);
const maxX = ref(0.47);
const minY = ref(-1.12);
const maxY = ref(1.12);

let scene: MandelbrotScene = new MandelbrotScene(
  '#mandelbrot-app',
  minX.value,
  maxX.value,
  minY.value,
  maxY.value,
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
      id="mandelbrot-app">
    </CanvasRoot>
    <ControlsPanel
      class="lg:col-span-2"
      :started="scene.processing"
      :hide-reset="true"
      :hide-start="true"
      @info="infoModal?.open()">
      <InputGroup
        label="minX">
        <input
          type="text"
          v-model.number="minX"
          class="input input-bordered w-full max-w-xs"
          @input="scene.minX = minX" />
      </InputGroup>
      <InputGroup label="maxX">
        <input
          type="text"
          v-model.number="maxX"
          class="input input-bordered w-full max-w-xs"
          @input="scene.maxX = maxX" />
      </InputGroup>
      <InputGroup label="minY">
        <input
          type="text"
          v-model.number="minY"
          class="input input-bordered w-full max-w-xs"
          @input="scene.minY = minY" />
      </InputGroup>
      <InputGroup label="maxY">
        <input
          type="text"
          v-model.number="maxY"
          class="input input-bordered w-full max-w-xs"
          @input="scene.maxY = maxY" />
      </InputGroup>
    </ControlsPanel>
    <ModalWindow ref="infoModal">
    </ModalWindow>
  </div>
</template>

<style scoped>

</style>