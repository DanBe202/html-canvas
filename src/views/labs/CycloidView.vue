<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { CycloidScene } from '@/scenes/cycloid.scene';

const circleDiameter = ref(100);
const pointDistance = ref(50);
let scene: CycloidScene = new CycloidScene('#cycloid-app', circleDiameter.value, pointDistance.value);

onMounted(() => {
  scene.start();
});
</script>

<template>
  <div class="grid gap-4">
    <div class="flex justify-center"
         id="cycloid-app">
    </div>
    <div class="grid grid-cols-2 mx-6 mt-3 gap-4">
      <label class="block mt-4">
        Diameter: {{circleDiameter}}
        <input id="circle-diameter"
               type="range"
               min="10"
               max="200"
               v-model.number="circleDiameter"
               class="range range-accent mt-2"
               @input="scene.diameter = circleDiameter"/>
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
               @input="scene.pointDistance = pointDistance"/>
      </label>
    </div>
  </div>
</template>

<style scoped>

</style>
