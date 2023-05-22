const express = require("express");
const router = express.Router();
const AppointmentController = require("../controllers/AppointmentController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get("/", AppointmentController.Search);
router.get("/:id", AppointmentController.SearchByID);
router.post("/",AppointmentController.Create);
router.post("/update/:id",upload.single("file"), AppointmentController.Update);
router.post("/delete/:id", AppointmentController.Delete);

module.exports = router;
