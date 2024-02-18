<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { CycloidScene } from '@/scenes/cycloid.scene';
import ControlsPanel from '@/components/common/ControlsPanel.vue';
import InputGroup from '@/components/common/InputGroup.vue';
import CanvasRoot from '@/components/common/CanvasRoot.vue';
import ModalWindow from '@/components/common/ModalWindow.vue';
import CycloidWiki from '@/components/wiki/CycloidWiki.vue';

const circleDiameter = ref(100);
const pointDistance = ref(50);
let scene: CycloidScene = new CycloidScene('#cycloid-app', circleDiameter.value, pointDistance.value);
const infoModal = ref<InstanceType<typeof ModalWindow> | null>(null);

onMounted(() => {
  scene.setup();
});
</script>

<template>
  <div class="grid gap-4 grid-cols-1 lg:grid-cols-6">
    <CanvasRoot
      class="lg:col-span-4"
      id="cycloid-app"></CanvasRoot>
    <ControlsPanel
      class="lg:col-span-2"
      :started="scene.processing"
      @reset="scene.reset()"
      @start="scene.start()"
      @stop="scene.stop()"
      @info="infoModal?.open()">
      <InputGroup
        label="Diameter"
        :label-alt="circleDiameter">
        <input
          type="range"
          min="10"
          max="200"
          v-model.number="circleDiameter"
          class="range range-accent"
          @input="scene.diameter = circleDiameter" />
      </InputGroup>
      <InputGroup
        label="Distance from center"
        :label-alt="pointDistance">
        <input
          type="range"
          min="20"
          max="200"
          v-model.number="pointDistance"
          class="range range-accent"
          @input="scene.pointDistance = pointDistance" />
      </InputGroup>
    </ControlsPanel>
    <ModalWindow ref="infoModal">
      <CycloidWiki></CycloidWiki>
    </ModalWindow>
  </div>
</template>
