interface Position {
  x: number
  y: number
}

// enum TargetType {
//   Planet,
// }

export interface SocketData {
  miners: SocketMiner[]
  asteroids: SocketAsteroid[]
  planets: SocketPlanet[]
}

export interface SocketAsteroid {
  position: Position
  _id: string
  name: string
  minerals: number
  status: number
  currentMiner: string
  __v: number
}

export interface SocketPlanet {
  position: Position
  _id: string
  name: string
  minerals: number
  miners: number
  __v: number
}

export interface SocketMiner {
  _id: string
  name: string
  planet: SocketPlanet
  x: number
  y: number
  angle: number
  carryCapacity: number
  travelSpeed: number
  miningSpeed: number
  status: number
  minerals: number
  __v: number
  target: SocketAsteroid
  targetType: string
}

// socket data
// const asteroidsData = {
//   position: { x: 516, y: 489 },
//   _id: '6603785de6d827bd8db07e65',
//   name: 'Asteroid 1',
//   minerals: 0,
//   status: 1,
//   currentMiner: null,
//   __v: 0,
// }

// const minerData = {
//   _id: '6603785ee6d827bd8db07e99',
//   name: 'Miner 1',
//   planet: { position: { x: 129, y: 162 }, _id: '6603785ee6d827bd8db07e7a', name: 'Planet 1', minerals: 36, miners: 1, __v: 0 },
//   x: 129,
//   y: 162,
//   angle: -112,
//   carryCapacity: 9,
//   travelSpeed: 26,
//   miningSpeed: 170,
//   status: 0,
//   minerals: 0,
//   __v: 0,
//   target: { position: { x: 311, y: 605 }, _id: '6603785de6d827bd8db07e6e', name: 'Asteroid 10', minerals: 0, status: 1, currentMiner: null, __v: 0 },
//   targetType: 'Planet',
// }

// const planetData = {
//   position: { x: 129, y: 162 },
//   _id: '6603785ee6d827bd8db07e7a',
//   name: 'Planet 1',
//   minerals: 36,
//   miners: 1,
//   __v: 0,
// }
