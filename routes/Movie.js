var express = require('express')
var router = express.Router()
const movieData = require('../data/Movie.json')

router.get('/', (req, res) => {
    try {
        res.status(201).json({movies: movieData})
    } catch (error) {
        res.status(500).json({
            message: "Internal server error", error
        })
    }
})

router.get('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id)

        if (isNaN(id)) {
            return res.status(400).json({
                message: "Invalid ID - must be a number"
            })
        }

        const movies = movieData.find(mv => mv.id === id)

        if (!movies) {
            return res.status(404).json({
                message: `Movie with this ${id} not found`
            })
        }

        res.json({
            movies
        })

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error with id'
        });
    }
})

module.exports = router