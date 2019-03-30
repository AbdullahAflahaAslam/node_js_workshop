const express = require('express')

const api = require('./api')

const router = express.Router()

router.use('/api', api)
router.get('/', (req, res) => res.json({message: 'Welcome to My API.'}));

module.exports = router