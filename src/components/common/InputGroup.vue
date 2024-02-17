<script setup lang="ts">
interface Props {
  label: string;
  labelAlt?: string | number;
}

defineProps<Props>();
</script>

<template>
  <label class="form-control w-full">
    <div class="label">
      <span class="label-text">{{ label }}</span>
      <span
        v-if="labelAlt"
        class="label-text-alt">
        {{ labelAlt }}
      </span>
    </div>
    <slot></slot>
  </label>
</template>

<style scoped></style>
