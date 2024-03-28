<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'

const { titles, values } = defineProps<{
  titles: Array<string>
  valueToShow: Array<string>
  values: Array<any>
}>()

const emit = defineEmits(['createMiner'])

function getDataClass(dataName: string, dataValue: string | number) {
  if (dataName.toLowerCase() === 'showminerals') {
    const a = dataValue.split('/')[0]
    return a >= 1000 ? 'green' : ''
  }

  return ''
}

function createMinerClickHandler() {
  emit('createMiner')
}
</script>

<template>
  <table p-4 text-left>
    <tr class="line font-lato" b-b-1 b-l-0 b-r-0 b-t-0>
      <th v-for="(title, index) in titles" :key="index" min-w-100px p-b-4 p-l-0 p-r-4 p-t-4 font-size-11px color-white font-bold>
        {{ title }}
      </th>
    </tr>
    <tr v-for="miner in values" :key="miner.id" class="line font-lato-light" b-b-1 b-l-0 b-r-0 b-t-0>
      <td v-for="name in valueToShow" :key="name + miner.id" p-b-4 p-l-0 p-r-4 p-t-4 font-size-12px>
        <template v-if="name !== 'control'">
          <span :class="getDataClass(name, miner[name])">{{ miner[name] }}</span>
        </template>
        <template v-else-if="name === 'control' && miner.minerals >= 1000">
          <button flex justify-center flex-items-center @click="createMinerClickHandler">
            <img m-2 src="/assets/imgs/miners/add.png">
            <span text="#00F0FF">Create a miner</span>
          </button>
        </template>
      </td>
    </tr>
  </table>
</template>

<style>
td {
  color: #9499c3;
}

.line {
  color: #9499c3;
}

.green {
  color: #00cf67;
}
</style>
