    const { Lenses, Brands, Lenses_images } = require('../models');

const lensesController = {
    //create new lenses
    createLenses: async (req, res) => {
        try {
            const { lens_type, brand_id, model, color, price, description, discount_price, discount_percentage, quantity } = req.body;
            if (!lens_type) {
                return res.status(400).json({ error: "lens_type is required" });
            }
            const lens = await Lenses.create({
                lens_type,
                brand_id,
                model,
                color,
                price,
                description,
                discount_price,
                discount_percentage,
                quantity,
            });
            res.status(201).json(lens);
        } catch (error) {
            res.status(500).json({
                error: 'Failed to create Lenses',
                details: error.message
            });
        }
    },

    //get all lenses 
    getAllLenses: async (req, res) => {
        try {
            const lenses = await Lenses.findAll({
                include: [
                    {
                        model: Brands,
                        as: 'brand',  // Alias must match the alias defined in the association
                        attributes: ['brand_name', 'brand_image'] // Include only the fields you need
                    },
                    {
                        model: Lenses_images,
                        as: 'images',
                        attributes: ['image_url', 'image_type']
                    }
                ]
            })
            res.status(200).json(lenses);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve Lenses', details: error.message })
        };
    },

    // get a specific lens by id 
    getLensById: async (req, res) => {

        try {
            const { id } = req.params;
            const lens = await Lenses.findByPk(id, {
                include: [
                    {
                        model: Brands,
                        as: 'brand',  // Alias must match the alias defined in the association
                        attributes: ['brand_name', 'brand_image'] // Include only the fields you need
                    },
                    {
                        model: Lenses_images,
                        as: 'images',
                        attributes: ['image_url', 'image_type']
                    }
                ]
            });
            if (!lens) {
                return res.status(404).json({ error: 'Lens not found' });
            }
            res.status(200).json(lens);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve Lenses', details: error.message });
        }
    },
    // Update a Lens
    updateLens: async (req, res) => {
        try {
            const { id } = req.params;
            const { lens_type, brand_id, model, color, price, description, discount_price, discount_percentage, quantity } = req.body;

            const lens = await Lenses.findByPk(id);

            if (!lens) {
                return res.status(404).json({ error: 'Lens not found' });
            }

            // Update the Lenses with new data
            await lens.update({
                lens_type,
                brand_id,
                model,
                color,
                price,
                description,
                discount_price,
                discount_percentage,
                quantity,
            });

            res.status(200).json(lens);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update Lenses', details: error.message });
        }
    },
    deleteLens: async (req, res) => {
        try {
            const { id } = req.params;

            const lens = await Lenses.findByPk(id);

            if (!lens) {
                return res.status(404).json({ error: 'Lens not found' });
            }

            // Delete the Lenses
            await lens.destroy();

            res.status(200).json({ message: 'Lens deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete Lenses', details: error.message });
        }
    },




    //images:- 

    createImage: async (req, res) => {
        try {
            const { lenses_id, image_url, image_type } = req.body;

            // Validate request body
            if (!lenses_id || !image_url || !image_type) {
                return res.status(400).json({ error: "lenses_id, image_url, and image_type are required" });
            }

            // Check if the lens exists
            const lens = await Lenses.findByPk(lenses_id);
            if (!lens) {
                return res.status(404).json({ message: "Lens not found" });
            }

            const newImage = await Lenses_images.create({
                lenses_id, image_url, image_type
            });
            res.status(201).json(newImage);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getImagesByLensId: async (req, res) => {
        try {
            const { lenses_id } = req.params;
            const images = await Lenses_images.findAll({
                where: { lenses_id }
            });
            if (images.length > 0) {
                res.status(200).json(images);
            } else {
                res.status(404).json({ message: "No images found for the specified lens" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    // Update an existing image by image_id
    updateImage: async (req, res) => {
        try {
            const { id } = req.body;
            const updatedImage = await Lenses_images.update(req.body, {
                where: { id },
                returning: true,
            });
            if (updatedImage[0]) {
                res.status(200).json(updatedImage[1][0]); // Send updated image details
            } else {
                res.status(404).json({ message: "Image not found" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Delete an image by image_id
    deleteImage: async (req, res) => {
        try {
            const { id } = req.body;
            const deleted = await Lenses_images.destroy({
                where: { id },
            });
            if (deleted) {
                res.status(204).json({ message: "Image deleted successfully" });
            } else {
                res.status(404).json({ message: "Image not found" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },



}
module.exports = lensesController;