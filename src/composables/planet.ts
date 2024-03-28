import type { SocketPlanet } from './socketData'

// const demo = {
//   position: { x: 535, y: 107 },
//   _id: '66042392458c2d7e17b8e587',
//   name: 'Planet 1',
//   minerals: 1140,
//   miners: 3,
//   __v: 0,
// }

export interface ShowPlanet extends SocketPlanet {
  showName?: string
  showMinerals?: string
}
