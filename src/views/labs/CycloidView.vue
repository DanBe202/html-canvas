<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { CycloidScene } from '@/scenes/cycloid.scene';

const circleDiameter = ref(100);
const pointDistance = ref(50);
let scene: CycloidScene | undefined;

onMounted(() => {
  scene = new CycloidScene(circleDiameter.value, pointDistance.value);
  scene.start();
});

function onDiameterChange(): void {
  if (!scene) {
    return;
  }
  scene.diameter = circleDiameter.value;
}

function onPointDistanceChange(): void {
  if (!scene) {
    return;
  }
  scene.pointDistance = pointDistance.value;
}
</script>

<template>
  <div class="grid grid-rows-2 gap-4">
    <div>
      <canvas class="m-auto" id="main-canvas"></canvas>
    </div>
    <div class="grid grid-cols-2 mt-3 gap-4">
      <label>
        Diameter: {{circleDiameter}}
        <input id="circle-diameter"
               type="range"
               min="10"
               max="200"
               v-model.number="circleDiameter"
               class="range range-accent mt-2"
               @input="onDiameterChange()"/>
      </label>
      <label class="mt-4 block">
        Distance from center
        <input id="point-distance"
               placeholder="Enter point distance from center"
               type="number"
               min="20"
               max="200"
               v-model.number="pointDistance"
               class="input input-bordered w-full mt-2"
               @input="onPointDistanceChange()"/>
      </label>
    </div>
  </div>
</template>

<style scoped>

</style>