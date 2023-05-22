const express = require('express')
const router = express.Router()

const CommentController = require('../controllers/CommentController')

router.get('/', CommentController.Search)
router.get('/:id', CommentController.SearchByID)
router.post('/', CommentController.Create)
router.put('/:id', CommentController.Update)
router.delete('/:id', CommentController.Delete)

module.exports = router
