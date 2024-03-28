import axios from 'axios'
import { CONFIG } from './globalConfig'

export class HttpAPI {
  private globalURL() {
    return `https://${CONFIG.apiDomain}`
  }

  private log(api: string, res: any) {
    if (CONFIG.debug && false) {
      // eslint-disable-next-line no-console
      console.log(`[API] ${api} ${JSON.stringify(res)}`)
    }
  }

  public async miners() {
    try {
      const res = await axios.get(`${this.globalURL()}/miners`)
      this.log('miners', res)
      return res.data
    }
    catch (error) {
      console.error(error)
    }
  }

  public async minersByPlanetID(planetID: string) {
    try {
      const res = await axios.get(`${this.globalURL()}/miners?planetId=${planetID}`)
      this.log('minersByPlanetID', res)
      return res.data
    }
    catch (error) {
      console.error(error)
    }
  }

  public async minerByID(minerID: string) {
    try {
      const res = await axios.get(`${this.globalURL()}/miners/${minerID}`)
      this.log('minerByID', res)
      return res.data
    }
    catch (error) {
      console.error(error)
    }
  }

  public async minerHistory(minerID: string) {
    try {
      const res = await axios.get(`${this.globalURL()}/history?minerId=${minerID}`)
      this.log('minerHistory', res)
      return res.data
    }
    catch (error) {
      console.error(error)
    }
  }

  public async asteroids() {
    try {
      const res = await axios.get(`${this.globalURL()}/asteroids`)
      this.log('asteroids', res)
      return res.data
    }
    catch (error) {
      console.error(error)
    }
  }

  public async planets() {
    try {
      const res = await axios.get(`${this.globalURL()}/planets`)
      this.log('planets', res)
      return res.data
    }
    catch (error) {
      console.error(error)
    }
  }
}
