<template>
  <section></section> <!-- 添加section以应用背景图片样式 -->
  <Sidebar />
</template>

<script setup lang="ts">
import Sidebar from '../components/SidebarItems.vue';
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  font-family: Poppins, sans-serif;
  box-sizing: border-box;
}

section {
  min-height: 100vh;
  background: url("../assets/background_for_dashboard.jpg") no-repeat center;
  background-size: cover;
  animation: animateBg 5s linear infinite;
}

@keyframes animateBg {
  to {
    filter: hue-rotate(360deg);
  }
}
</style>


