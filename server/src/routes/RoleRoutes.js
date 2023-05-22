const express = require('express')
const router = express.Router()

const RoleController = require('../controllers/RoleController')

router.get('/', RoleController.Search)
router.get('/:id', RoleController.SearchByID)
router.post('/', RoleController.Create)
router.put('/:id', RoleController.Update)
router.delete('/:id', RoleController.Delete)

module.exports = router
