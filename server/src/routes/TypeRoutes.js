const express = require("express");
const router = express.Router();
const TypeController = require("../controllers/TypeController")

router.get("/", TypeController.Search);

module.exports = router;
