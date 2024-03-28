import { io } from 'socket.io-client'
import { CONFIG } from './globalConfig'

export class SocketAPI {
  private tickCallback = null
  constructor(callback: any) {
    // eslint-disable-next-line no-console
    console.log('[tick]')
    this.tickCallback = callback
  }

  startTick() {
    const socket = io(`${CONFIG.wsDomain}`, {
      reconnection: true, // 是否允许重连（默认为 true）
      reconnectionAttempts: 5, // 在放弃之前尝试重新连接的次数（默认为 Infinity）
      reconnectionDelay: 1000, // 重新连接之间的延迟（默认为 1000 毫秒）
      reconnectionDelayMax: 5000, // 重新连接之间的最大延迟（默认为 5000 毫秒）
    }) // 根据你的服务器地址和端口修改

    socket.on('connect', () => {
      // eslint-disable-next-line no-console
      console.log('[SOCKET] Connected to server')
    })

    socket.on('reconnect', (attemptNumber) => {
      // eslint-disable-next-line no-console
      console.log('Reconnecting...', attemptNumber)
    })

    socket.on('reconnect_failed', () => {
      console.error('Failed to reconnect, please check your connection.')
    })

    socket.on('tick', this.tickCallback)
  }
}
