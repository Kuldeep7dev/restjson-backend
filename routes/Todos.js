const express = require('express')
const router = express.Router()
const todosData = require('../data/Todo.json')

router.get('/', (req, res) => {
    try {
        const { completed } = req.query;

        let result = todosData;

        if (completed === 'true') {
            result = todosData.todos.filter(t => t.completed === true);
        } else if (completed === 'false') {
            result = todosData.todos.filter(t => t.completed === false);
        }

        res.json({ todo: result, count: result.length });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error'
        });
        console.log(error);
    }
});

router.get('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: 'Invalid ID - must be a number'
            });
        }

        const todo = todosData.todos.find(t => t.id === id);

        if (!todo) {
            return res.status(404).json({
                message: `Todo with id ${id} not found`
            });
        }

        res.json({
            data: todo
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error with id'
        });
    }
});

module.exports = router