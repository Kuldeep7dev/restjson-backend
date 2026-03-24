const express = require('express')
const ApiLog = require('../Model/ApiLog')

const router = express.Router()

router.get('/', async (req, res) => {
    console.log("ApiLog type:", typeof ApiLog)
    console.log("ApiLog:", ApiLog)

    const logs = await ApiLog.find()
        .sort({ time: -1 })
        .limit(50)

    res.json(logs)
})

module.exports = router
