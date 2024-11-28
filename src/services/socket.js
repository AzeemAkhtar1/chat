import { io } from 'socket.io-client'

const SOCKET_URL = process.env.VUE_APP_API_URL || 'http://localhost:3000'

export const initializeSocket = (token) => {
  return new Promise((resolve) => {
    const socket = io(SOCKET_URL, {
      auth: {
        token
      }
    })

    socket.on('connect', () => {
      console.log('Connected to socket server')
      resolve(socket)
    })

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error)
    })
  })
}
