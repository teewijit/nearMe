const express = require("express");
const router = express.Router();
const StoreController = require("../controllers/StoreController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get("/", StoreController.Search);
router.get("/:id", StoreController.SearchByID);
router.post("/", upload.single("file"), StoreController.Create);
router.post("/update/:id",upload.single("file"), StoreController.Update);
router.post("/delete/:id", StoreController.Delete);
// router.put("/:id", StoreController.Delete);

// router.post('/upload', upload.single('file'), (req, res) => {
//     res.send(req.file)
//     console.log(req.file);
//   })

module.exports = router;
