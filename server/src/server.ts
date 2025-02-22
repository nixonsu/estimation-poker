import express, { Request, Response } from 'express'
import { createServer } from 'node:http'

const app = express()
const port = 3000
const server = createServer(app)

app.use('/', (req: Request, res: Response) => {
  res.send('<h1>Hello world</h1>')
})

app.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})
