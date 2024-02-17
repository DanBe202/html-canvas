<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  started?: boolean;
}

const { started } = withDefaults(defineProps<Props>(), { started: false });

const processing = ref(started);

const emit = defineEmits(['start', 'stop', 'reset']);

function onStart(): void {
  processing.value = true;
  emit('start');
}

function onStop(): void {
  processing.value = false;
  emit('stop');
}

function toggle(): void {
  if (processing.value) {
    return onStop();
  }
  return onStart();
}
</script>

<template>
  <div class="prose">
    <h2>Controls</h2>
    <div class="grid gap-4">
      <slot></slot>
    </div>
    <div class="grid grid-cols-3 mt-4 gap-2">
      <button
        class="btn btn-warning col-start-2"
        @click="$emit('reset')">
        Reset
      </button>
      <button
        class="btn col-start-3"
        :class="processing ? 'btn-error' : 'btn-success'"
        @click="toggle()">
        {{ processing ? 'Stop' : 'Start' }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
