<script setup lang="ts">
// 使用 defineProps 定义 props
const { titles, values } = defineProps<{
  titles: Array<string>
  valueToShow: Array<string>
  values: Array<any>
}>()

function getDataClass(dataName: string, dataValue: string | number) {
  if (dataName.toLowerCase() === 'showminerals')
    return dataValue as number === 0 ? 'red' : ''

  return ''
}
</script>

<template>
  <table p-4 text-left>
    <tr class="font-lato line" b-b-1 b-l-0 b-r-0 b-t-0>
      <th v-for="(title, index) in titles" :key="index" min-w-100px p-b-4 p-l-0 p-r-4 p-t-4 font-size-11px color-white font-bold>
        {{ title }}
      </th>
    </tr>
    <tr v-for="miner in values" :key="miner.id" class="line font-lato-light" b-b-1 b-l-0 b-r-0 b-t-0>
      <td v-for="name in valueToShow" :key="name + miner.id" p-b-4 p-l-0 p-r-4 p-t-4 font-size-12px>
        <span :class="getDataClass(name, miner[name])">{{ miner[name] }}</span>
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

.red {
  color: #eb5757;
}
</style>
