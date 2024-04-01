<script setup lang="ts">
import { Matrix } from '@/scenes/common/math/matrix';
import PointInput from '@/components/common/PointInput.vue';
import { XMarkIcon } from '@heroicons/vue/16/solid';

interface Props {
  deleteLine: boolean;
}

defineProps<Props>();

defineEmits(['delete']);

const model = defineModel<Matrix>({
  required: true,
});
</script>

<template>
  <div class="flex gap-6 items-center">
    <div>
      <template
        v-for="(vector, i) in model.matrix"
        :key="vector.id">
        <PointInput v-model="model.matrix[i]"></PointInput>
      </template>
    </div>
    <button
      class="btn btn-square btn-error"
      :disabled="!deleteLine"
      @click="$emit('delete')">
      <XMarkIcon class="h-6 w-6"></XMarkIcon>
    </button>
  </div>
</template>

<style scoped></style>
