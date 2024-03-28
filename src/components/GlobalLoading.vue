<script setup lang="ts">
import { defineProps } from 'vue'

// 使用 defineProps 定义 props
const { loadingShow } = defineProps<{
  loadingShow: boolean
}>()

// const emit = defineEmits(['loadingClose'])
</script>

<template>
  <div v-if="loadingShow" class="loading-container">
    <div class="loading-mask" />
    <img src="/assets/imgs/miners/loader.png" alt="loading">
  </div>
</template>

<style>
.loading-container {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-mask {
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #1a1c31;
  opacity: 95%;
}

.loading-container img {
  animation: rotate 1s ease-in-out infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
