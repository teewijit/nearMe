const express = require('express')
const router = express.Router()

const RatingController = require('../controllers/RatingController')

router.get('/', RatingController.Search)
router.get('/:id', RatingController.SearchByID)
router.post('/', RatingController.Create)
router.put('/:id', RatingController.Update)
router.delete('/:id', RatingController.Delete)

module.exports = router
