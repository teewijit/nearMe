const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserController')

router.get('/', UserController.Search)
router.get('/:id', UserController.SearchByID)
router.post('/', UserController.Create)
router.post('/:id', UserController.Update)
router.delete('/:id', UserController.Delete)
router.post("/checkPass/:id", UserController.checkPass);
router.post("/update/:id", UserController.Update);
router.post("/delete/:id", UserController.Delete);

module.exports = router
