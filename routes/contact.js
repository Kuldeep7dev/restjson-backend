var express = require('express')
const contact = require('../Model/Contact')
var router = express.Router()

router.get('/', async (req, res) => {
    try {
        const getData = await contact.find()
        res.status(200).json({
            message: "successfully",
            contact: getData
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error'
        })
    }
})

router.get('/get-count', async (req, res) => {
    try {
        const getData = await contact.countDocuments()
        res.status(200).json({
            message: "successfully",
            contact: getData
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error'
        })
    }
})

router.post('/', async (req, res) => {
    try {
        const data = req.body
        const postData = await contact.create(data)
        res.status(201).json({
            message: "successfully",
            contact: postData
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error'
        })
    }
})



module.exports = router