const express = require('express');
const glassesController = require("../controllers/glassesController");
const router = express.Router();

router.post("/add", glassesController.addNewGlasses);
router.get("/getAll", glassesController.getAllGlasses);
router.get("/get/:id", glassesController.getGlassesById);
router.put("/:id", glassesController.updateGlasses);
router.delete("/:id", glassesController.deleteGlasses);

//images
router.get('/images/:glasses_id', glassesController.getImagesByGlassesId);
router.post('/images', glassesController.createImage);
router.put('/images/update', glassesController.updateImage);
router.delete('/images/delete', glassesController.deleteImage);

module.exports = router;
