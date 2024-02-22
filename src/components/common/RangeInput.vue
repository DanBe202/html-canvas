<script lang="ts" setup>
interface Props {
  range: [number, number];
}

defineProps<Props>();
const model = defineModel();
</script>

<template>
  <input
    v-model.number="model"
    :max="range[1]"
    :min="range[0]"
    class="range range-accent"
    type="range" />
</template>
