const ApiLog = require('../Model/ApiLog')

let globalCount = 0   // 🟢 simple in-memory counter

const apiLogger = async (req, res, next) => {
    try {
        globalCount += 1

        await ApiLog.create({
            count: globalCount,
            method: req.method,
            url: req.originalUrl,
            ip: req.ip,
            userAgent: req.headers["user-agent"],
            time: new Date()
        })
    } catch (err) {
        console.log("Logging error", err)
    }

    next()
}

module.exports = apiLogger
