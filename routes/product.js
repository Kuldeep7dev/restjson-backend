const express = require('express')
const router = express.Router()
const productsData = require('../data/products.json')

router.get('/', (req, res) => {
    try {
        res.json({ products: productsData })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error })
    }
})

router.get('/featured', (req, res) => {
    try {
        const featuredItems = productsData.filter(item => item.isActive === true)

        res.status(200).json({
            featured: featuredItems
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
})

router.get('/:id', (req, res) => {
    const id = Number(req.params.id)

    if (!Number.isInteger(id)) {
        return res.status(400).json({
            message: 'Invalid product ID'
        })
    }

    const singleProduct = productsData.products.find(p => p.id === id)

    if (!singleProduct) {
        return res.status(404).json({
            message: 'Product not found'
        })
    }

    res.json(singleProduct)
})



module.exports = router