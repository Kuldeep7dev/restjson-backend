var express = require('express');
var router = express.Router();
const visiter = require('../data/Visiter.json')


router.get('/', (req, res) => {
    try {
        const { member } = req.query;


        if (member === 'true') {
            return res.json(visiter.filter(v => v.membership?.status === true));
        }

        if (member === 'false') {
            return res.json(visiter.filter(v => v.membership?.status === false));
        }
        res.json({ visiters: visiter });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error', error
        })
        console.log(error);
        
    }
})

router.get('/:id', (req, res) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid ID'
            });
        }

        const visitor = visiter.find(v => v.id === id);

        if (!visitor) {
            return res.status(404).json({
                success: false,
                message: 'Visitor not found'
            });
        }

        res.json({
            success: true,
            data: visitor
        });

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error
        });
    }
});



module.exports = router