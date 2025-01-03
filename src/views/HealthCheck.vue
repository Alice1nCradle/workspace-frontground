<script setup lang="ts">
import { ref } from 'vue';
import axios, { isAxiosError } from 'axios'

// 先定义ApiResponse统一接口
// 以后肯定要纳入统一的模块中
// 目前这个结构还真不确定是啥，就先unknown吧
interface ApiResponse {
  [key: string]: unknown;
}

// 先定义ApiError统一定义
// 对了，以后得纳入到统一的模块之中
interface ApiError {
  error: boolean;
  message: string;
}

const result = ref<ApiResponse | ApiError | null>(null);

const healthCheckResponse = async (): Promise<void> => {
  try {
    const response = await axios.get<ApiResponse>("http://localhost:8000/health");
    result.value = response.data;
    console.log(response.data);
  }

  catch (error) {
    if (isAxiosError(error)) {
      console.error("Warning, an error has occurred.", error);
      result.value = {
        error: true,
        message: error.message || "Unknown error."
      }
    }
    else {
      console.error("Warning, an unknown error has occurred.", error);
      result.value = {
        error: true,
        message: "Unknown error."
      }
    }
  }
}

</script>

<template>
  <div class="healthCheck">
    <h1 class="healthCheckSuccess">Congratulations!</h1>
    <h2>You can access this website successfully!</h2>
    <button class="healthCheckResponse" @click="healthCheckResponse">Click here to receive health condition.</button>
    <h2 v-if="result">{{ result }}</h2>
  </div>
</template>

<style scoped>
.healthCheck {
  display: grid;
  justify-content: center;
}

.healthCheckSuccess {
  display: grid;
  justify-content: center;
}

h2 {
  text-align: center;
}
</style>

