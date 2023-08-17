const express = require('express')
const router = express.Router()

const {validateStudent} = require('../../middlewares/validateStudent')

const {index,store,destroy} = require('../../controllers/web/studentController')

router.get('/',index)
router.post('/',validateStudent,store)
router.delete('/:id',destroy)

module.exports = router