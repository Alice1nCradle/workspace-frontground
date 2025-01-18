<template>
  <div :class="['sidebar', { active: isSidebarActive }]">
    <div class="logo-content">
      <div class="logo">
        <i class="bx bxl-flutter"></i>
        <h3>Eagle</h3>
      </div>
      <i class="bx bx-menu" @click="toggleSidebar" id="btn"></i>
    </div>

    <ul class="list">
      <li>
        <a href="#">
          <i class="bx bx-search"></i>
          <input type="text" placeholder="Search..." />
        </a>
      </li>
      <li :class="{ active: isActive('Dashboard') }" @click="setActive('Dashboard')">
        <a href="#">
          <i class="bx bx-grid-alt"></i>
          <span class="links-name">Dashboard</span>
        </a>
        <span class="tooltip">Dashboard</span>
      </li>
      <li :class="{ active: isActive('Users') }" @click="setActive('Users')">
        <a href="#">
          <i class="bx bx-user"></i>
          <span class="links-name">Users</span>
        </a>
        <span class="tooltip">Users</span>
      </li>
      <li :class="{ active: isActive('Message') }" @click="setActive('Message')">
        <a href="#">
          <i class="bx bx-chat"></i>
          <span class="links-name">Message</span>
        </a>
        <span class="tooltip">Message</span>
      </li>
      <li :class="{ active: isActive('Analytics') }" @click="setActive('Analytics')">
        <a href="#">
          <i class="bx bx-pie-chart-alt"></i>
          <span class="links-name">Analytics</span>
        </a>
        <span class="tooltip">Analytics</span>
      </li>
      <li :class="{ active: isActive('FileManager') }" @click="setActive('FileManager')">
        <a href="#">
          <i class="bx bx-folder"></i>
          <span class="links-name">File Manager</span>
        </a>
        <span class="tooltip">File Manager</span>
      </li>
      <li :class="{ active: isActive('Order') }" @click="setActive('Order')">
        <a href="#">
          <i class="bx bx-cart-alt"></i>
          <span class="links-name">Order</span>
        </a>
        <span class="tooltip">Order</span>
      </li>
      <li :class="{ active: isActive('Saved') }" @click="setActive('Saved')">
        <a href="#">
          <i class="bx bx-heart"></i>
          <span class="links-name">Saved</span>
        </a>
        <span class="tooltip">Saved</span>
      </li>
      <li :class="{ active: isActive('Setting') }" @click="setActive('Setting')">
        <a href="#">
          <i class="bx bx-cog"></i>
          <span class="links-name">Setting</span>
        </a>
        <span class="tooltip">Setting</span>
      </li>
    </ul>

    <ul class="list-logout">
      <li>
        <a href="#">
          <i class="bx bx-log-out"></i>
          <span class="links-name">Logout</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import 'boxicons/css/boxicons.css'

const isSidebarActive = ref<boolean>(true);
const activeItem = ref<string>('Dashboard');

// Toggle sidebar active state
const toggleSidebar = (): void => {
  isSidebarActive.value = !isSidebarActive.value;
};

// Set active item
const setActive = (item: string): void => {
  activeItem.value = item;
};

// Check if the item is active
const isActive = (item: string): boolean => {
  return activeItem.value === item;
};
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  font-family: Poppins, sans-serif;
  box-sizing: border-box;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 80px;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  border-right: 2px solid rgba(255, 255, 255, 0.1);
  padding: 6px 14px;
  transition: 0.5s ease;
}

.sidebar.active {
  width: 240px;
}

.sidebar .logo {
  display: flex;
  align-items: center;
  color: #ffffff;
  width: 100%;
  height: 50px;
  pointer-events: none;
  font-size: 28px;
  opacity: 0;
  transition: 0.3s ease;
}

.sidebar.active .logo {
  transition-delay: 0.2s;
  opacity: 1;
}

.sidebar .logo h3 {
  font-size: 20px;
}

.sidebar #btn {
  position: absolute;
  color: #fff;
  font-size: 20px;
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
}

.sidebar.active #btn {
  left: 90%;
}

.sidebar ul {
  margin-top: 20px;
}

.sidebar ul li {
  list-style: none;
  position: relative;
  width: 100%;
  margin: 5px 0;
  line-height: 50px;
}

.sidebar ul li.active {
  background: #327aff;
}

.sidebar ul li .tooltip {
  position: absolute;
  top: 0;
  left: 130px;
  transform: translate(-50%, -50%);
  height: 35px;
  background: #327aff;
  color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  line-height: 35px;
  pointer-events: none;
  width: 122px;
  opacity: 0;
}

.sidebar.active ul li .tooltip {
  display: none;
}

.sidebar ul li {
  overflow: hidden;
}
.sidebar ul li:hover {
  overflow: initial;
}

.sidebar ul li:hover .tooltip {
  top: 50%;
  transition: 0.5s ease;
  opacity: 1;
}

.sidebar ul li .links-name {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.sidebar.active ul li .links-name {
  opacity: 1;
}

.sidebar ul li input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  outline: none;
  border-radius: 6px;
  font-size: 18px;
  color: #ffffff;
  padding-left: 50px;
}

.sidebar ul li .bx-search {
  color: #ffffff;
  font-size: 22px;
  z-index: 1;
}

.sidebar ul li i {
  min-width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
}

.sidebar ul li a {
  color: #ffffff;
  display: flex;
  align-items: center;
  text-decoration: none;
  white-space: nowrap;
}

.sidebar ul li a:hover {
  background: rgba(255, 255, 255, 0.1);
}

.sidebar .list-logout {
  position: absolute;
  bottom: 0;
  margin: 15px 0;
  width: 64%;
}

.sidebar.active .list-logout {
  width: 89%;
}
</style>
