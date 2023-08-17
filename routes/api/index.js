const express = require('express')
const router = express.Router()

const {index,store,update,destroy} = require('../../controllers/api/studentController')
const {validateStudent,validateID} = require('../../middlewares/validateStudent')

router.get('/',index)
router.post('/',validateStudent,store)
router.put('/:id',validateID,update)
router.delete('/:id',validateID,destroy)

module.exports = router