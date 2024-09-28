const express = require('express');
const { createLenses, getAllLenses, getLensById, updateLens, deleteLens, getImagesByLensId, createImage, updateImage, deleteImage } = require("../controllers/lensesController");
const router = express.Router();
router.post('/new-lenses', createLenses);
router.get('/get-lenses', getAllLenses)
router.get('/get-lenses/:id', getLensById)
router.put('/update-lenses/:id', updateLens)
router.delete('/delete-lenses/:id', deleteLens)

// Lenses images routes
router.get('/images/:lenses_id', getImagesByLensId);
router.post('/images', createImage);
router.put('/images', updateImage);
router.delete('/images', deleteImage);

module.exports = router;
