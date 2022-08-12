import { createContext } from "react"
import { connect } from "socket.io-client"

export const socket = connect('wss://localhost:8443', {
  secure: true,
  reconnectionAttempts: 5,
  reconnection: true,
  reconnectionDelay: 5000,
  timeout: 10000,
})
export const SocketContext = createContext(socket)