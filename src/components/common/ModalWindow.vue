<script setup lang="ts">
import { ref } from 'vue';

const dialog = ref<HTMLDialogElement | null>(null);

function open(): void {
  dialog.value?.showModal();
}

defineExpose({ open });
</script>

<template>
  <dialog
    ref="dialog"
    class="modal modal-bottom md:modal-middle">
    <div class="modal-box md:w-11/12 lg:w-6/12 md:max-w-5xl h-full md:h-auto">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <slot></slot>
    </div>
    <form
      method="dialog"
      class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<style scoped></style>
