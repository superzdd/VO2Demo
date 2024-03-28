<script setup lang="ts" generic="T extends any, O extends any">
// import { computed } from 'vue'
// import { demoData } from './demo'
import { HttpAPI } from '~/composables/httpApi'
import { SocketAPI } from '~/composables/socketApi'
import type { SocketAsteroid, SocketData, SocketMiner, SocketPlanet } from '~/composables/socketData'
import type { ShowMiner } from '~/composables/miner'
import { MinerController } from '~/composables/minerController'
import type { ShowMinerHistory } from '~/composables/minerHistory'
import { MinerHistoryController } from '~/composables/minerHistoryController'
import type { ShowAsteroid } from '~/composables/asteroid'
import { AsteroidController } from '~/composables/asteroidController'
import type { ShowPlanet } from '~/composables/planet'
import { PlanetController } from '~/composables/planetController'
import DTMine from '~/components/DTMine.vue'
import DTAsteroid from '~/components/DTAsteroid.vue'
import DTPlanet from '~/components/DTPlanet.vue'
import QueryIcon from '~/components/QueryIcon.vue'
import Dialog from '~/components/Dialog.vue'
import GlobalLoading from '~/components/GlobalLoading.vue'

/** Variable Init */

defineOptions({
  name: 'IndexPage',
})

const QueryTabTitle = {
  Miners: 'Miners',
  Asteroids: 'Asteroids',
  Planets: 'Planets',
}
const currQuery = ref(QueryTabTitle.Miners)

// miner history
const currentMiner = reactive({
  id: '',
  name: '',
})
const showPopUpWindow = ref(false)
const minerHistoryTable = ref(null) // the history html element
const dialogShow = ref(false) // global dialog on/off flag
const loadingShow = ref(1) // global loading dialog on/off flag, the dialog will show when the value >= 1
const socketData: SocketData = reactive({
  miners: [],
  asteroids: [],
  planets: [],
}) // the data interface from socket data

const httpAPI = new HttpAPI()
let socketOnce = 1 // log socket data. only once
let handlerInvervalAsteroids: number // interval handler -> http query Asteroids
let handlerInvervalPlanets: number// interval handler -> http query Planets

const socket = new SocketAPI((data: {
  miners: SocketMiner[]
  asteroids: SocketAsteroid[]
  planets: SocketPlanet[]
}) => {
  socketData.miners = data.miners
  socketData.asteroids = data.asteroids
  socketData.planets = data.planets
})

const minerData: Array<ShowMiner> = reactive([])
const minerHistoryData: Array<ShowMinerHistory> = reactive([])
const asteroidData: Array<ShowAsteroid> = reactive([])
const planetData: Array<ShowPlanet> = reactive([])

watch(socketData, async (newValue) => {
  const showData = MinerController.mergeMinersValue(newValue.miners)
  minerData.splice(0, minerData.length, ...showData)

  if (socketOnce >= 1) {
    socketOnce -= 1
    loadingShow.value -= 1
  }
})

function dialogCloseHandler() {
  dialogShow.value = false
}

// Manage miner history show value
async function showMinerHistroy(miner: ShowMiner) {
  currentMiner.id = miner._id
  currentMiner.name = `Mi${miner.name.split(' ')[1]}`
  minerHistoryData.splice(0, minerHistoryData.length)
  // currentMiner = miner
  showPopUpWindow.value = true
  // console.log(`currentMiner is ${JSON.stringify(currentMiner)}`)

  const historyMiner = await httpAPI.minerHistory(miner._id)

  const showData = MinerHistoryController.mergeMinersHistoryValue(historyMiner)

  minerHistoryData.splice(0, 0, ...showData)
  if (minerHistoryTable.value)
    minerHistoryTable.value.focus()
}

function showLoadingDialog() {
  loadingShow.value++
}

function hideLoadingDialog() {
  if (loadingShow.value > 0)
    loadingShow.value--
}

function closePopUp() {
  showPopUpWindow.value = false
}

function changeQuery(arg: string) {
  currQuery.value = arg
  clearInterval(handlerInvervalAsteroids)
  clearInterval(handlerInvervalPlanets)
  if (arg === QueryTabTitle.Asteroids) {
    if (asteroidData.length === 0)
      showLoadingDialog()
    handlerInvervalAsteroids = setInterval(async () => {
      const asteroids: Array<SocketAsteroid> = await httpAPI.asteroids()
      const showData = AsteroidController.mergeValue(asteroids, socketData.miners)
      asteroidData.splice(0, asteroidData.length, ...showData)
      hideLoadingDialog()
    }, 1000)
  }
  else if (arg === QueryTabTitle.Planets) {
    if (planetData.length === 0)
      showLoadingDialog()
    handlerInvervalPlanets = setInterval(async () => {
      const planets: Array<SocketPlanet> = await httpAPI.planets()
      const showData = PlanetController.mergeValue(planets)
      planetData.splice(0, planetData.length, ...showData)
      hideLoadingDialog()
    }, 1000)
  }
}

function createMinerHandler() {
  dialogShow.value = true
}

// app start!!
socket.startTick()
</script>

<template>
  <div class="vo2-container" position-fixed left-0 top-0 h-100vh w-100vw>
    <div class="resource-info">
      <div class="header" m-24px>
        <h1 class="font-poppins">
          <img src="/assets/imgs/miners/logo.png">
          <span p-2>BACKEND MINER</span>
        </h1>
        <div class="icon-container" mx-auto my-10px flex justify-center flex-items-center>
          <QueryIcon icon-src="icon-miners" :text="QueryTabTitle.Miners" :select-item="currQuery" @query-click="changeQuery" />
          <QueryIcon icon-src="icon-asteroids" :text="QueryTabTitle.Asteroids" :select-item="currQuery" @query-click="changeQuery" />
          <QueryIcon icon-src="icon-planets" :text="QueryTabTitle.Planets" :select-item="currQuery" @query-click="changeQuery" />
        </div>
        <div class="line" b b-b-solid />
      </div>
      <div v-show="currQuery === QueryTabTitle.Miners" class="table-container" m-b-0 m-l-auto m-r-auto m-t-0 h-80vh w-50vw flex justify-center flex-items-start overflow-y-auto>
        <DTMine flex-grow-0 :titles="MinerController.Titles" :values="minerData" :value-to-show="MinerController.ShowTitles" @pop-miner="showMinerHistroy" />
      </div>
      <div v-show="currQuery === QueryTabTitle.Asteroids" class="table-container" m-b-0 m-l-auto m-r-auto m-t-0 h-80vh w-50vw flex justify-center flex-items-start overflow-y-auto>
        <DTAsteroid flex-grow-0 :titles="AsteroidController.Titles" :values="asteroidData" :value-to-show="AsteroidController.ShowTitles" />
      </div>
      <div v-show="currQuery === QueryTabTitle.Planets" class="table-container" m-b-0 m-l-auto m-r-auto m-t-0 h-80vh w-50vw flex justify-center flex-items-start overflow-y-auto>
        <DTPlanet flex-grow-0 :titles="PlanetController.Titles" :values="planetData" :value-to-show="PlanetController.ShowTitles" @create-miner="createMinerHandler" />
      </div>
    </div>

    <div v-show="showPopUpWindow" class="pop-up-container" position-absolute left-0 top-0 z-99>
      <div class="mask" position-absolute left-0 top-0 z-0 />
      <div class="miner-pop-up" align-center flex flex-col justify-start border-rd-10px>
        <div class="close-btn" position-absolute right-5 top-5 h-19px w-20px overflow-visible border-rd-12px>
          <img src="/assets/imgs/miners/delete.png" @click="closePopUp()">
        </div>

        <h2 text="center white" p-32px font-size-16px font-700 class="font-lato">
          History of {{ currentMiner.name }}
        </h2>
        <div ref="minerHistoryTable" class="table-container" m-4 max-h-374px flex justify-center overflow-x-hidden overflow-y-scroll align-start>
          <DTMine :titles="MinerHistoryController.Titles" :value-to-show="MinerHistoryController.ShowTitles" :values="minerHistoryData" />
        </div>
      </div>
    </div>
    <Teleport to="body">
      <Dialog dialog-text="Sorry!! The development is not complete" :dialog-show="dialogShow" @dialog-close="dialogCloseHandler" />
    </Teleport>
    <Teleport to="body">
      <GlobalLoading :loading-show="loadingShow >= 1" />
    </Teleport>
  </div>
</template>

<style>
.vo2-container {
  background-color: #191a29;
}

.resource-info {
  /* width: 100%;
  height: 100%; */
}

.pop-up-container {
  width: 100%;
  height: 100%;
}

.close-btn {
  background: radial-gradient(#fff, #fff 40%, transparent 45%);
  box-shadow: 1px 1px 1px #000;
}

.close-btn img {
  width: 100%;
  height: auto;
  transform: scale(1.2);
}

.pop-up-container .mask {
  width: 100%;
  height: 100%;
  background-color: #101123;
  opacity: 0.9;
}

.table-container::-webkit-scrollbar-track {
  background-color: #1a1b2f;
  border-radius: 10px; /* 轨道的圆角 */
}

.table-container::-webkit-scrollbar {
  width: 10px;
}

.table-container::-webkit-scrollbar-thumb {
  background-color: #9499c3;
  border-radius: 10px;
}

.miner-pop-up {
  position: absolute;
  background-color: #1a1b2f;
  min-width: 782px;
  height: 486px;
  left: 50%;
  top: 15%;
  transform: translateX(-50%);
}

.header h1 {
  color: #fff;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin: 24px auto; */
  font-weight: lighter;
  letter-spacing: 2px;
}

.header img {
  width: 24px;
  height: 24px;
}

.line {
  border-color: #33344b;
}

.icon-container {
  margin: 10px auto;
}
</style>
