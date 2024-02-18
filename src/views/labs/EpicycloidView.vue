<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { EpicycloidScene } from '@/scenes/epicycloid.scene';
import CanvasRoot from '@/components/common/CanvasRoot.vue';
import ControlsPanel from '@/components/common/ControlsPanel.vue';
import InputGroup from '@/components/common/InputGroup.vue';
import ModalWindow from '@/components/common/ModalWindow.vue';
import EpicycloidWiki from '@/components/wiki/EpicycloidWiki.vue';

const innerCircleDiameter = ref(100);
const outerCircleDiameter = ref(100);
const pointDistance = ref(50);
let scene: EpicycloidScene = new EpicycloidScene(
  '#epicycloid-app',
  innerCircleDiameter.value,
  outerCircleDiameter.value,
  pointDistance.value,
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
      id="epicycloid-app">
    </CanvasRoot>
    <ControlsPanel
      class="lg:col-span-2"
      :started="scene.processing"
      @start="scene.start()"
      @stop="scene.stop()"
      @reset="scene.reset()"
      @info="infoModal?.open()">
      <InputGroup
        label="Inner circle diameter"
        :label-alt="innerCircleDiameter">
        <input
          type="range"
          min="10"
          max="200"
          v-model.number="innerCircleDiameter"
          class="range range-accent"
          @input="scene.innerDiameter = innerCircleDiameter" />
      </InputGroup>
      <InputGroup
        label="Outer circle diameter"
        :label-alt="outerCircleDiameter">
        <input
          type="range"
          min="10"
          max="200"
          v-model.number="outerCircleDiameter"
          class="range range-accent"
          @input="scene.outerDiameter = outerCircleDiameter" />
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
      <EpicycloidWiki></EpicycloidWiki>
    </ModalWindow>
  </div>
</template>

<style scoped></style>
