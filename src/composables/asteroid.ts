import type { SocketAsteroid } from './socketData'

// cosnt demo = {
//   "position": { "x": 887, "y": 959 },
//   "_id": "660422292917e7c6aec9eef5",
//   "name": "Asteroid 1",
//   "minerals": 0,
//   "status": 1,
//   "currentMiner": null,
//   "__v": 0
// }

export interface ShowAsteroid extends SocketAsteroid {
  showName?: string
  showMinerals?: string
  showCurrentMiner?: string
  showPosition?: string
}
