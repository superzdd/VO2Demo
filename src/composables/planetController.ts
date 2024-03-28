import type { ShowPlanet } from './planet'
import type { SocketPlanet } from './socketData'

export class PlanetController {
  public static readonly Titles = ['Name', 'Miners', 'Minerals', ' ']
  public static readonly ShowTitles = ['showName', 'miners', 'showMinerals', 'control']

  public static mergeValue(planets: Array<SocketPlanet>) {
    const ret: Array<ShowPlanet> = []
    // const planets = socketData.planets
    planets.forEach((ast: SocketPlanet) => {
      const m: ShowPlanet = {
        ...ast,
        showName: `P${ast.name.split(' ')[1]}`,
        showMinerals: `${ast.minerals}/1000`,
      }

      ret.push(m)
    })

    return ret
  }

  private static getMinerName(minerID: string, miners: Array<SocketMiner>) {
    const miner = miners.find(m => m._id === minerID)
    if (miner)
      return miner.name
    return ''
  }
}
