<script setup lang="ts">
interface Props {
  title: string;
}

defineProps<Props>();
</script>

<template>
  <article class="prose mx-auto">
    <h1>{{ title }}</h1>
    <slot></slot>
  </article>
</template>

<style scoped></style>
