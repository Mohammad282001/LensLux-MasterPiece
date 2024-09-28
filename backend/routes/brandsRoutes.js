const express = require('express');
const { addNewBrand,getBrands } = require("../controllers/brandController");
const router = express.Router();
router.post('/new-brand', addNewBrand);
router.get("/get-Brands", getBrands)

module.exports = router;
