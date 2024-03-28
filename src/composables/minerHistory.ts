// const demo = { capacity: { current: 197, max: 197 }, speed: { travel: 145, mining: 157 }, position: { x: 389, y: 212 }, _id: '6603939f709863311e0a3618', year: 222, planet: 'Planet 1', status: 4, miner: '660392ba709863311e0a11b8', createdAt: '2024-03-27T03:33:51.199Z', updatedAt: '2024-03-27T03:33:51.199Z', __v: 0 }
interface Capacity {
  current: number
  max: number
}

interface Speed {
  travel: number
  mining: number
}

interface Position {
  x: number
  y: number
}

export interface MinerHistory {
  _id: string
  capacity: Capacity
  speed: Speed
  position: Position
  year: number
  planet: string
  status: number
  miner: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface ShowMinerHistory extends MinerHistory {
  showDate?: string
  showPlanet?: string
  showCarryCapacity?: string
  showTravelSpeed?: number
  showMiningSpeed?: number
  showPosition?: string
  showStatus?: string
}
