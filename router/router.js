
const controller = require('../controller/controller')

const router =require('express').Router()
router.post('/create',controller.add)

module.exports = router