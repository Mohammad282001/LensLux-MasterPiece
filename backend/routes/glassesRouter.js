const express = require('express');
const glassesController = require("../controllers/glassesController");
const router = express.Router();

router.post("/add", glassesController.addNewGlasses);
router.get("/getAll", glassesController.getAllGlasses);
router.get("/get/:id", glassesController.getGlassesById);
router.put("/:id", glassesController.updateGlasses);
router.delete("/delete/:id", glassesController.deleteGlasses);
// router.get("?type=:type&category=:category", glassesController.getGlassesFilter)

// router.get("/filter", glassesController.getByCategoryAndType); // Route for glasses with query params//images
// router.get("/filter", glassesController.getByType); // Route for glasses with query params//images
router.get("/filter", glassesController.getByCategoryAndTypeOrType);


router.get('/images/:glasses_id', glassesController.getImagesByGlassesId);
router.post('/images', glassesController.createImage);
router.put('/images/update', glassesController.updateImage);
router.delete('/images/delete', glassesController.deleteImage);

module.exports = router;
