<script setup lang="ts">
import RangeInput from '@/components/common/RangeInput.vue';
import InputGroup from '@/components/common/InputGroup.vue';
import { ref } from 'vue';
import LineInput from '@/components/common/LineInput.vue';
import type { Lines } from '@/scenes/common/math/bezier-surface';
import { Vector } from '@/scenes/common/math/vector';

const pointsCount = ref(3);
const model = defineModel<Lines>({
  required: true,
});

function updatePointsCount(): void {
  model.value.forEach((line) => {
    if (line.height < pointsCount.value) {
      line.matrix.push(Vector.zero());
      return;
    }
    line.matrix.pop();
  });
}

function deleteLine(index: number): void {
  model.value.splice(index, 1);
}
</script>

<template>
  <div>
    <InputGroup
      label="Points count"
      :label-alt="pointsCount">
      <RangeInput
        :range="[2, 5]"
        v-model="pointsCount"
        @update:model-value="updatePointsCount()"></RangeInput>
    </InputGroup>
    <div
      class="mt-6"
      v-for="(matrix, i) in model"
      :key="matrix.id">
      <div class="divider">Line {{ i + 1 }}</div>
      <LineInput
        v-model="model[i]"
        :delete-line="model.length > 3"
        @delete="deleteLine(i)"></LineInput>
    </div>
  </div>
</template>

<style scoped></style>
