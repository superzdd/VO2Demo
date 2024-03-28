import type { ShowMinerHistory } from './minerHistory'
import { statusToStr } from './miner'

export class MinerHistoryController {
  public static readonly Titles = ['Date', 'Year', 'Planet', 'carryCapacity', 'travelSpeed', 'miningSpeed', 'Position', 'Status']
  public static readonly ShowTitles = ['showDate', 'year', 'showPlanet', 'showCarryCapacity', 'showTravelSpeed', 'showMiningSpeed', 'showPosition', 'showStatus']

  public static mergeMinersHistoryValue(orgData: Array<ShowMinerHistory>) {
    const ret = JSON.parse(JSON.stringify(orgData))
    ret.forEach((miner: ShowMinerHistory) => {
    // showDate
      miner.showDate = CommonTools.formatDateTime(miner.createdAt)

      // show planet
      miner.showPlanet = `Pl${miner.planet.split(' ')[1]}`

      // show carryCapacity
      miner.showCarryCapacity = `${miner.capacity.current}/${miner.capacity.max}`

      // travel speed
      miner.showTravelSpeed = miner.speed.travel

      // show mining speed
      miner.showMiningSpeed = miner.speed.mining

      // show position
      miner.showPosition = `${Math.round(miner.position.x)},${Math.round(miner.position.y)}`

      miner.showStatus = statusToStr(miner.status)
    })

    return ret
  }
}
