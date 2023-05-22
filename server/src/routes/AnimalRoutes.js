const express = require("express");
const router = express.Router();
const AnimalController = require("../controllers/AnimalController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get("/", AnimalController.Search);
router.get("/:id", AnimalController.SearchByID);
router.post("/", upload.single("file"), AnimalController.Create);
router.post("/update/:id",upload.single("file"), AnimalController.Update);
router.post("/delete/:id", AnimalController.Delete);
// router.put("/:id", StoreController.Delete);

// router.post('/upload', upload.single('file'), (req, res) => {
//     res.send(req.file)
//     console.log(req.file);
//   })

module.exports = router;
