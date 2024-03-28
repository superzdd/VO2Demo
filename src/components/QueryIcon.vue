<script setup lang="ts">
import { defineEmits } from 'vue'

// 使用 defineProps 定义 props
const { iconSrc, text, selectItem } = defineProps<{
  iconSrc: string
  text: string
  selectItem: string
}>()

const emit = defineEmits(['queryClick'])

function clickHandler() {
  emit('queryClick', text)
}

function getClass() {
  if (selectItem === text)
    return 'selected border-solid'

  return ''
}
</script>

<template>
  <div class="icon" :class="getClass()" @click="clickHandler">
    <!-- <img :src="iconSrc"> -->
    <span :class="iconSrc" />
    <div class="font-lato text">
      {{ text }}
    </div>
  </div>
</template>

<style>
.icon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  padding: 10px;
  border-radius: 10px;
  margin: 10px;
  transition: all 0.1s;
}

.icon span {
  font-size: 32px;
}

.icon .text {
  color: #9499c3;
  font-size: 12px;
  font-weight: 400;
  margin: 6px;
}

.selected {
  box-shadow: 0px 1px #0d0216;
  border-color: #9499c3;
  border-width: 1px;
  color: #38d9a9;
}
</style>
