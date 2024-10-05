const express = require('express');
const { addNewBrand, getBrands, getBrandFor } = require("../controllers/brandController");
const router = express.Router();
router.post('/new-brand', addNewBrand);
router.get("/get-Brands", getBrands)
router.get("/get-Brands/:brand_for", getBrandFor)

module.exports = router;
