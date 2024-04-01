<script setup lang="ts">
import CanvasRoot from '@/components/common/CanvasRoot.vue';
import { computed, onMounted, ref } from 'vue';
import { BezierSurfaceScene } from '@/scenes/bezier-surface.scene';
import { Vector } from '@/scenes/common/math/vector';
import ControlsPanel from '@/components/common/ControlsPanel.vue';
import SurfaceInput from '@/components/common/SurfaceInput.vue';
import { Matrix } from '@/scenes/common/math/matrix';
import bezierSurface from '@/scenes/common/shapes/3d/bezier-surface.json';
import type { Lines } from '@/scenes/common/math/bezier-surface';

const scene: BezierSurfaceScene = new BezierSurfaceScene('#bezier-app');
const cell = ref(1);
const cells = computed(() => new Vector([cell.value + 10, cell.value + 20]));
const lines = ref<Lines>(bezierSurface.map((matrix) => new Matrix(matrix)));

onMounted(() => {
  scene.setup();
  scene.start();
});

function redraw(): void {
  scene.changeSurface(lines.value as Lines, cells.value);
}

function addLine(): void {
  lines.value.push(Matrix.from(lines.value[0].height, lines.value[0].width));
}
</script>

<template>
  <div class="grid gap-8 grid-cols-1 lg:grid-cols-6">
    <CanvasRoot
      id="bezier-app"
      class="lg:col-span-4"></CanvasRoot>
    <ControlsPanel
      :hide-start="true"
      :hide-reset="true"
      class="lg:col-span-2">
      <SurfaceInput v-model="lines"></SurfaceInput>
      <template v-slot:button>
        <button
          class="btn btn-secondary"
          @click="redraw()">
          Redraw
        </button>
        <button
          class="btn btn-success"
          @click="addLine()">
          Add line
        </button>
      </template>
    </ControlsPanel>
  </div>
</template>

<style scoped></style>
