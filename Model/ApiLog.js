const mongoose = require('mongoose')

const apiLogSchema = new mongoose.Schema({
    count: {
        type: Number,
        default: 1
    },
    method: String,
    url: String,
    ip: String,
    userAgent: String,
    time: {
        type: Date,
        default: Date.now
    }
})

const ApiLog =
    mongoose.models.ApiLog || mongoose.model('ApiLog', apiLogSchema)

module.exports = ApiLog