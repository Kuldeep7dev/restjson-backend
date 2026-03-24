var express = require('express');
var router = express.Router();
const usersData = require('../data/Users.json')


router.get('/', function (req, res) {
  try {
    res.json({ users: usersData })
  } catch (error) {
    res.status(500).json({
      message: "Error by developer ❌", error
    })
  }
});

router.get('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        message: 'Invalid ID — must be a number'
      });
    }

    const user = usersData.find(u => u.id === id);

    if (!user) {
      return res.status(404).json({
        message: `User with id ${id} not found`
      });
    }

    res.json({
      data: user
    });

  } catch (error) {
    console.log(error);
    
    res.status(500).json({
      message: 'Internal server error',
      error
    });
  }
});


module.exports = router;
