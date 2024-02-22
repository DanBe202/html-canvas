<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { CycloidScene } from '@/scenes/cycloid.scene';
import ControlsPanel from '@/components/common/ControlsPanel.vue';
import InputGroup from '@/components/common/InputGroup.vue';
import CanvasRoot from '@/components/common/CanvasRoot.vue';
import ModalWindow from '@/components/common/ModalWindow.vue';
import CycloidWiki from '@/components/wiki/CycloidWiki.vue';
import RangeInput from '@/components/common/RangeInput.vue';

const circleDiameter = ref(100);
const pointDistance = ref(50);
let scene: CycloidScene = new CycloidScene('#cycloid-app', circleDiameter.value, pointDistance.value);
const infoModal = ref<InstanceType<typeof ModalWindow> | null>(null);

onMounted(async () => {
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
        <RangeInput
          v-model="circleDiameter"
          :range="[10, 200]"
          @update:model-value="scene.diameter = circleDiameter"></RangeInput>
      </InputGroup>
      <InputGroup
        label="Distance from center"
        :label-alt="pointDistance">
        <RangeInput
          v-model="pointDistance"
          :range="[20, 200]"
          @update:model-value="scene.pointDistance = pointDistance"></RangeInput>
      </InputGroup>
    </ControlsPanel>
    <ModalWindow ref="infoModal">
      <CycloidWiki></CycloidWiki>
    </ModalWindow>
  </div>
</template>
