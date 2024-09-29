// routes/glassesDetailsRouter.js
const express = require('express');
const glassesDetailsController = require('../controllers/glassesDetailsController'); // Adjust the path as necessary

const router = express.Router();

// Define routes
router.post('/', glassesDetailsController.create); // Create a new glasses detail
router.get('/', glassesDetailsController.getAll); // Get all glasses details
router.get('/:id', glassesDetailsController.getById); // Get a glasses detail by ID
router.put('/:id', glassesDetailsController.update); // Update a glasses detail
router.delete('/:id', glassesDetailsController.delete); // Delete a glasses detail

module.exports = router;
