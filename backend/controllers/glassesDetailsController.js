const { Glasses_details, Glasses } = require('../models'); // Adjust the path according to your project structure

const glassesDetailsController = {
    // Create a new glasses detail
    create: async (req, res) => {
        try {
            const { glasses_id } = req.body;

            // Check if the glasses_id exists in the Glasses table
            const glasses = await Glasses.findByPk(glasses_id);
            if (!glasses) {
                return res.status(400).json({ message: 'Glasses ID does not exist' });
            }

            const glassesDetail = await Glasses_details.create(req.body);
            return res.status(201).json(glassesDetail);
        } catch (error) {
            console.error('Error creating glasses detail:', error);
            if (error.name === 'SequelizeValidationError') {
                return res.status(400).json({ message: 'Validation error', errors: error.errors });
            }
            return res.status(500).json({ message: 'Error creating glasses detail', error });
        }
    },

    // Get all glasses details
    getAll: async (req, res) => {
        try {
            const glassesDetails = await Glasses_details.findAll();
            return res.status(200).json(glassesDetails);
        } catch (error) {
            console.error('Error fetching glasses details:', error);
            return res.status(500).json({ message: 'Error fetching glasses details', error });
        }
    },

    // Get a specific glasses detail by ID
    getById: async (req, res) => {
        try {
            const glassesDetail = await Glasses_details.findByPk(req.params.id);
            if (!glassesDetail) {
                return res.status(404).json({ message: 'Glasses detail not found' });
            }
            return res.status(200).json(glassesDetail);
        } catch (error) {
            console.error('Error fetching glasses detail:', error);
            return res.status(500).json({ message: 'Error fetching glasses detail', error });
        }
    },

    // Update a glasses detail
    update: async (req, res) => {
        try {
            const [updated] = await Glasses_details.update(req.body, {
                where: { detail_id: req.params.id },
            });
            if (!updated) {
                return res.status(404).json({ message: 'Glasses detail not found' });
            }
            const updatedGlassesDetail = await Glasses_details.findByPk(req.params.id);
            return res.status(200).json(updatedGlassesDetail);
        } catch (error) {
            console.error('Error updating glasses detail:', error);
            if (error.name === 'SequelizeValidationError') {
                return res.status(400).json({ message: 'Validation error', errors: error.errors });
            }
            return res.status(500).json({ message: 'Error updating glasses detail', error });
        }
    },

    // Delete a glasses detail
    delete: async (req, res) => {
        try {
            const deleted = await Glasses_details.destroy({
                where: { detail_id: req.params.id },
            });
            if (!deleted) {
                return res.status(404).json({ message: 'Glasses detail not found' });
            }
            return res.status(204).send(); // No content
        } catch (error) {
            console.error('Error deleting glasses detail:', error);
            return res.status(500).json({ message: 'Error deleting glasses detail', error });
        }
    },
};

module.exports = glassesDetailsController;
