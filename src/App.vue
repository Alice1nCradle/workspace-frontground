<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <!--
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/health">HealthCheck</RouterLink>
      </nav>
    </div>
  </header>
  !-->
  <div class="fullscreen">
    <RouterView />
  </div>
</template>

<style scoped>
/*
给所有组件的页面都全屏了，有什么其他需要以后再说
其实我觉得是没有什么必要了。
*/
</style>
