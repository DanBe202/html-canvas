<script setup lang="ts">
import { RouterLink, type RouterLinkProps } from 'vue-router';
import { computed } from 'vue';

defineOptions({
  inheritAttrs: false,
});

interface Props extends RouterLinkProps {
  inactiveClass?: string;
}

const { to } = defineProps<Props>();

const isExternalLink = computed(() => {
  return typeof to === 'string' && to.startsWith('http');
});

const link = computed(() => to as string);
</script>

<template>
  <a
    v-if="isExternalLink"
    v-bind="$attrs"
    :href="link"
    target="_blank">
    <slot />
  </a>
  <RouterLink
    v-else
    v-bind="$props"
    custom
    v-slot="{ isActive, href, navigate }">
    <a
      v-bind="$attrs"
      :href="href"
      @click="navigate"
      :class="isActive ? activeClass : inactiveClass">
      <slot />
    </a>
  </RouterLink>
</template>

<style scoped></style>
