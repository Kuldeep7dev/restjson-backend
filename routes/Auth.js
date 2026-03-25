var express = require('express')
const Admin = require('../Model/admin')
const passport = require('passport')
var router = express.Router()

router.get('/', async (req, res) => {
    try {
        const getAdmin = await Admin.find()
        res.status(200).json({
            auth: getAdmin
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error ❌'
        })
    }
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error('❌ Passport error:', err)
            return next(err)
        }
        console.log(user);

        if (!user) {
            console.warn('⚠️ Login failed:', info)
            return res.status(401).json({
                message: info?.message || 'Invalid email or password'
            })
        }
        req.logIn(user, (err) => {

            if (err) {
                console.error('❌ req.logIn error:', err)
                return next(err)
            }
            console.log('✅ User logged in:', user.email || user._id)
            return res.status(200).json({
                message: "Login successful ✅",
                user,
                token: process.env.JWT_SECRET
            })
        })

    })(req, res, next)
})

router.post('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        return res.status(200).json({ message: "Logout successful ✅" });
    });
})


module.exports = router