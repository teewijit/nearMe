'use strict'

require('dotenv').config()
require('./src/entity')
const express = require('express')
const app = express()
const port = process.env.PORT || 3333
const routers = require('./src/routes')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { logger } = require('./src/utils')
const path = require('path')

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`)
})

app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(express.json({ limit: '10mb' }))
app.use(cookieParser())
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))

app.use('/api', routers)
