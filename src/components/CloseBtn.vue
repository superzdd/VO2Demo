<script setup lang="ts">
const emit = defineEmits(['closeBtnClick'])

function closePopUp() {
  emit('closeBtnClick')
}
</script>

<template>
  <div class="close-btn" h-19px w-20px overflow-visible border-rd-12px>
    <img src="/assets/imgs/miners/delete.png" @click="closePopUp()">
  </div>
</template>

<style>
.close-btn {
  background: radial-gradient(#fff, #fff 40%, transparent 45%);
  box-shadow: 1px 1px 1px #000;
}

.close-btn img {
  width: 100%;
  height: auto;
  transform: scale(1.2);
}
</style>
