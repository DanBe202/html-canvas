<script setup lang="ts">
import InputGroup from '@/components/common/InputGroup.vue';
import { Vector } from '@/scenes/common/math/vector';

const model = defineModel<Vector>({
  required: true,
});

</script>
<template>
  <div class="grid grid-cols-3 gap-4">
    <InputGroup label="X">
      <input
        v-model.number="model.vector[0]"
        type="text"
        class="input input-bordered w-full max-w-xs" />
    </InputGroup>
    <InputGroup label="Y">
      <input
        v-model.number="model.vector[1]"
        type="text"
        class="input input-bordered w-full max-w-xs" />
    </InputGroup>
    <InputGroup label="Z">
      <input
        v-model.number="model.vector[2]"
        type="text"
        class="input input-bordered w-full max-w-xs" />
    </InputGroup>
  </div>
</template>

<style scoped></style>
