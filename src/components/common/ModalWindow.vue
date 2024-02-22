<script setup lang="ts">
import { ref } from 'vue';
import { XMarkIcon } from '@heroicons/vue/16/solid';

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
        <button class="btn btn-sm btn-circle btn-ghost fixed right-4 top-4">
          <XMarkIcon></XMarkIcon>
        </button>
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
