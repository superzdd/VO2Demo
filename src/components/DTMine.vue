<script setup lang="ts">
// 使用 defineProps 定义 props
const { titles, values } = defineProps<{
  titles: Array<string>
  valueToShow: Array<string>
  values: Array<any>
}>()

const emit = defineEmits(['popMiner'])

function handelClick(miner: any) {
  emit('popMiner', miner)
}

function getDataClass(dataName: string, dataValue: string | number) {
  if (dataName.toLowerCase() === 'showname') {
    return 'color-white decoration-underline hover:cursor-pointer'
  }
  else if (dataName.toLowerCase() === 'showcarrycapacity') {
    const [a, b] = dataValue.split('/')
    return a === b ? 'capacity--full' : ''
  }

  return ''
}

function getTitleClass(dataName: string) {
  if (dataName !== 'Status')
    return ''
  return 'col-status'
}
</script>

<template>
  <table p-4 text-left>
    <tr class="line font-lato" b-b-1 b-l-0 b-r-0 b-t-0>
      <th v-for="(title, index) in titles" :key="index" :class="getTitleClass(title)" p-b-4 p-l-0 p-r-4 p-t-4 font-size-11px color-white font-bold>
        {{ title }}
      </th>
    </tr>
    <tr v-for="miner in values" :key="miner.id" class="line font-lato-light" b-b-1 b-l-0 b-r-0 b-t-0>
      <td v-for="name in valueToShow" :key="name + miner.id" p-b-4 p-l-0 p-r-4 p-t-4 font-size-12px>
        <template v-if="name === 'showName'">
          <span :class="getDataClass(name, miner[name])" @click="handelClick(miner)">{{ miner[name] }}</span>
        </template>
        <template v-else>
          <span :class="getDataClass(name, miner[name])">{{ miner[name] }}</span>
        </template>
      </td>
    </tr>
  </table>
</template>

<style>
td {
  color: #9499c3;
}

.col-status {
  width: 200px;
  padding-right: 2rem;
}

.line {
  color: #9499c3;
}

.capacity--full {
  color: #00cf67;
}
</style>
