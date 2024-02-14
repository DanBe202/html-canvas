<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { HypocycloidScene } from '@/scenes/hypocycloid.scene';

const innerCircleDiameter = ref(100);
const outerCircleDiameter = ref(100);
const pointDistance = ref(50);
let scene: HypocycloidScene = new HypocycloidScene('#hypocycloid-app', innerCircleDiameter.value, outerCircleDiameter.value, pointDistance.value);

onMounted(() => {
  console.log('Mounted');
  scene.start();
});
</script>

<template>
  <div class="grid gap-4">
    <div class="flex justify-center"
         id="hypocycloid-app">
    </div>
    <div class="grid grid-cols-3 mx-6 mt-3 gap-4">
      <label class="block mt-4">
        Inner circle diameter: {{ innerCircleDiameter }}
        <input id="inner-circle-diameter"
               type="range"
               min="10"
               max="200"
               v-model.number="innerCircleDiameter"
               class="range range-accent mt-2"
               @input="scene.innerDiameter = innerCircleDiameter"/>
      </label>
      <label class="block mt-4">
        Inner circle diameter: {{ outerCircleDiameter }}
        <input id="outer-circle-diameter"
               type="range"
               min="10"
               max="200"
               v-model.number="outerCircleDiameter"
               class="range range-accent mt-2"
               @input="scene.outerDiameter = outerCircleDiameter"/>
      </label>
      <label class="mt-4 block">
        Distance from center: {{pointDistance}}
        <input id="point-distance"
               placeholder="Enter point distance from center"
               type="number"
               min="20"
               max="200"
               v-model.number="pointDistance"
               class="input input-bordered w-full mt-2"
               @input="scene.pointDistance = pointDistance" />
      </label>
    </div>
  </div>
</template>

<style scoped>

</style>