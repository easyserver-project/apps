import { MongoClient } from 'mongodb'
import fs from 'fs'

require('dotenv').config()

const connectionString = process.env.CONNECTION_STRING ||
  `mongodb://localhost:27017/es`

;(async () => {
  const client = await MongoClient.connect(connectionString, { useUnifiedTopology: true })
  const apps = JSON.parse(fs.readFileSync('./apps.json', 'utf8'))
  await client.db("es").collection("appConfig").deleteMany({})
  await client.db("es").collection("appConfig").insertMany(apps)
  await client.close()
})()