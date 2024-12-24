<template>
  <div class="about">
    <h1>count: {{ countStore.count }}</h1>
    <h1>double_count: {{ countStore.doubleCount }}</h1>
    <button @click="countStore.increment()">click to upper the value.</button>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter.ts'
const countStore = useCounterStore()
</script>
