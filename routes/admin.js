var express = require('express')
const Admin = require('../Model/admin')
var router = express.Router()
var bcrypt = require('bcrypt')

router.get('/', async (req, res) => {
    try {
        const getData = await Admin.find()
        res.status(200).json({
            admin: getData
        })
    } catch (error) {
        res.status(500).json({
            message: "Error"
        })
    }
})

router.post('/', async (req, res) => {
    try {
        const data = req.body
        const { password } = data
        const saltRounds = 10
        const hasedPassword = await bcrypt.hash(password, saltRounds)

        data.password = hasedPassword
        
        const postData = await Admin.create(data)
        res.status(201).json({
            admin: postData
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error"
        })
    }
})

module.exports = router