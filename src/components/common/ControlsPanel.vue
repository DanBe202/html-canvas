<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  started?: boolean;
  hideStart?: boolean;
  hideReset?: boolean;
}

const { started } = withDefaults(defineProps<Props>(), { started: false, hideStart: false, hideReset: false });

const processing = ref(started);

const emit = defineEmits(['start', 'stop', 'reset', 'info']);

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
        class="btn btn-info"
        @click="$emit('info')">
        Info
      </button>
      <button
        v-if="!hideReset"
        class="btn btn-warning"
        @click="$emit('reset')">
        Reset
      </button>
      <button
        v-if="!hideStart"
        class="btn"
        :class="processing ? 'btn-error' : 'btn-success'"
        @click="toggle()">
        {{ processing ? 'Stop' : 'Start' }}
      </button>
      <slot name="button"></slot>
    </div>
  </div>
</template>

<style scoped></style>
