<script setup lang="ts">
import WikiRoot from '@/components/wiki/WikiRoot.vue';
</script>

<template>
  <WikiRoot title="Epicycloid">
    <p>
      In geometry, an epicycloid (also called hypercycloid) is a plane curve produced by tracing the path of a chosen
      point on the circumference of a circle—called an epicycle—which rolls without slipping around a fixed circle. It
      is a particular kind of roulette. An epicycloid with a minor radius (R2) of 0 is a circle. This is a degenerate
      form.
    </p>

    <h2>Equations</h2>

    <p>
      If the smaller circle has radius<code>r</code>, and the larger circle has radius <code>R = kr </code>, then the
      parametric equations for the curve can be given by either:
    </p>
    <pre class="whitespace-pre-line">
      <code>
       x(θ) = (R + r) cos(θ) − r cos((R + r / r )θ)
       y(θ) = (R + r) sin(θ) − r sin((R + r / r )θ)
     </code>
    </pre>
    or:
    <pre class="whitespace-pre-line">
      <code>
        x(θ) = r(k + 1) cos(θ) − r cos((k + 1)θ)
        y(θ) = r(k + 1) sin(θ) − r sin((k + 1)θ)
      </code>
    </pre>
    <dl>
      <dt>where</dt>
      <dd>the angle <code>θ ∈ [0 , 2π]</code> ,</dd>
      <dd>the smaller circle has radius <code>r</code>, and</dd>
      <dd>the larger circle has radius <code>kr</code>.</dd>
    </dl>
  </WikiRoot>
</template>

<style scoped></style>
