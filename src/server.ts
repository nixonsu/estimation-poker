import express, { Request, Response } from 'express'
import { createServer } from 'node:http'
import { join } from 'node:path'
import { Server } from 'socket.io'

const app = express()
const port = 3000
const server = createServer(app)

const io = new Server(server)

app.use('/', (req: Request, res: Response) => {
  res.sendFile(join(__dirname, 'index.html'))
})

io.on('connection', socket => {
  console.log('a user connected')

  // Send to everyone but the sender
  socket.broadcast.emit('hi')

  socket.on('disconnect', () => {
    console.log('a user disconnected')
  })

  socket.on('chat message', message => {
    console.log('message: ' + message)
    // Send to everyone
    io.emit('chat message', message);
  })
})

server.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})
