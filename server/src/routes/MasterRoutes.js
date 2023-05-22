'use strict'

const express = require('express')
const router = express.Router()

const MasterController = require('../controller/MasterController')

router.get('/store', MasterController.Province)

module.exports = router
