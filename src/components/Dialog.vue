<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'
import CloseBtn from './CloseBtn.vue'

// 使用 defineProps 定义 props
const { dialogText, dialogShow } = defineProps<{
  dialogText: string
  dialogShow: boolean
}>()

const emit = defineEmits(['dialogClose'])

function clickHandler() {
  emit('dialogClose', dialogText)
}
</script>

<template>
  <div v-if="dialogShow" class="modal">
    <p class="font-lato">
      {{ dialogText }}
    </p>
    <CloseBtn position-absolute right-5 top-5 @close-btn-click="clickHandler" />
  </div>
</template>

<style>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 400px;
  height: 200px;
  transform: translateX(-50%);
  background-color: #1a1c31;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
}

.modal p {
  color: #fff;
  margin: 10px;
}
</style>
