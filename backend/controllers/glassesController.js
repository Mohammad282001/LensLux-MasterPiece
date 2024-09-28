const { Glasses, Brands, Glasses_images } = require('../models');

const glassesController = {
    addNewGlasses: async (req, res) => {
        try {
            const {
                brand_id,
                model,
                description,
                price,
                discount_price,
                discount_percentage,
                target_audience,
                category,
                sub_category,
                stock_quantity,
                has_virtual_try_on,
                virtual_try_on_data,
                frame_shape,
                face_frame_shape
            } = req.body;

            // Check if the brand_id exists
            const brand = await Brands.findByPk(brand_id);
            if (!brand) {
                return res.status(400).json({
                    error: 'Invalid brand_id',
                    details: 'Brand with the provided id does not exist'
                });
            }

            // Validate target_audience
            const validAudiences = ['men', 'women', 'unisex', 'kids'];
            if (!validAudiences.includes(target_audience)) {
                return res.status(400).json({
                    error: 'Invalid target audience',
                    details: `Target audience must be one of: ${validAudiences.join(', ')}`
                });
            }

            // Validate category
            const validCategories = ['eyeglasses', 'sunglasses'];
            if (!validCategories.includes(category)) {
                return res.status(400).json({
                    error: 'Invalid category',
                    details: `Category must be one of: ${validCategories.join(', ')}`
                });
            }

            const frame = await Glasses.create({
                brand_id,
                model,
                description,
                price,
                discount_price,
                discount_percentage,
                target_audience,
                category,
                sub_category,
                stock_quantity,
                has_virtual_try_on,
                virtual_try_on_data,
                frame_shape,
                face_frame_shape
            });

            res.status(201).json(frame);
        } catch (error) {
            res.status(500).json({
                error: 'Failed to add new glasses',
                details: error.message
            });
        }
    },

    getAllGlasses: async (req, res) => {
        try {
            const glasses = await Glasses.findAll({
                include: [
                    {
                        model: Brands,
                        as: 'brand',
                        attributes: ['brand_name', 'brand_image']
                    },
                    {
                        model: Glasses_images,
                        as: 'images',
                        attributes: ['image_url', 'image_type']
                    }
                ]
            });
            res.status(200).json(glasses);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve glasses', details: error.message });
        }
    },

    getGlassesById: async (req, res) => {
        try {
            const { id } = req.params;
            const glasses = await Glasses.findByPk(id, {
                include: [
                    {
                        model: Brands,
                        as: 'brand',
                        attributes: ['brand_name', 'brand_image']
                    },
                    {
                        model: Glasses_images,
                        as: 'images',
                        attributes: ['image_url', 'image_type']
                    }
                ]
            });
            if (!glasses) {
                return res.status(404).json({ error: 'Glasses not found' });
            }
            res.status(200).json(glasses);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve glasses', details: error.message });
        }
    },

    updateGlasses: async (req, res) => {
        try {
            const { id } = req.params;
            const {
                brand_id,
                model,
                description,
                price,
                discount_price,
                discount_percentage,
                target_audience,
                category,
                sub_category,
                stock_quantity,
                has_virtual_try_on,
                virtual_try_on_data,
                frame_shape,
                face_frame_shape
            } = req.body;

            const glasses = await Glasses.findByPk(id);
            if (!glasses) {
                return res.status(404).json({ error: 'Glasses not found' });
            }

            // Check if the brand_id exists
            const brand = await Brands.findByPk(brand_id);
            if (!brand) {
                return res.status(400).json({
                    error: 'Invalid brand_id',
                    details: 'Brand with the provided id does not exist'
                });
            }

            // Validate target_audience
            const validAudiences = ['men', 'women', 'unisex', 'kids'];
            if (!validAudiences.includes(target_audience)) {
                return res.status(400).json({
                    error: 'Invalid target audience',
                    details: `Target audience must be one of: ${validAudiences.join(', ')}`
                });
            }

            // Validate category
            const validCategories = ['eyeglasses', 'sunglasses'];
            if (!validCategories.includes(category)) {
                return res.status(400).json({
                    error: 'Invalid category',
                    details: `Category must be one of: ${validCategories.join(', ')}`
                });
            }

            await glasses.update({
                brand_id,
                model,
                description,
                price,
                discount_price,
                discount_percentage,
                target_audience,
                category,
                sub_category,
                stock_quantity,
                has_virtual_try_on,
                virtual_try_on_data,
                frame_shape,
                face_frame_shape
            });

            res.status(200).json(glasses);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update glasses', details: error.message });
        }
    },

    deleteGlasses: async (req, res) => {
        try {
            const { id } = req.params;

            const glasses = await Glasses.findByPk(id);
            if (!glasses) {
                return res.status(404).json({ error: 'Glasses not found' });
            }

            // Delete the glasses
            await glasses.destroy();

            res.status(200).json({ message: 'Glasses deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete glasses', details: error.message });
        }
    },




    //images

    createImage: async (req, res) => {
        try {
            const { glasses_id, image_url, image_type } = req.body;

            // Validate request body
            if (!glasses_id || !image_url || !image_type) {
                return res.status(400).json({ error: "glasses_id, image_url, and image_type are required" });
            }

            // Check if the lens exists
            const lens = await Glasses.findByPk(glasses_id);
            if (!lens) {
                return res.status(404).json({ message: "Glasses not found" });
            }

            const newImage = await Glasses_images.create({
                glasses_id, image_url, image_type
            });
            res.status(201).json(newImage);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getImagesByGlassesId: async (req, res) => {
        try {
            const { glasses_id } = req.params;
            const images = await Glasses_images.findAll({
                where: { glasses_id }
            });
            if (images.length > 0) {
                res.status(200).json(images);
            } else {
                res.status(404).json({ message: "No images found for the specified glasses" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    // Update an existing image by image_id
    updateImage: async (req, res) => {
        try {
            const { id } = req.body;

            // Validate ID
            if (typeof id !== 'number' || id <= 0) {
                return res.status(400).json({ error: "Invalid ID" });
            }

            const updatedImage = await Glasses_images.update(req.body, {
                where: { id },
                returning: true,
            });

            if (updatedImage[0]) {
                res.status(200).json(updatedImage[1][0]); // Send updated image details
            } else {
                res.status(404).json({ message: "Image not found" });
            }
        } catch (error) {
            console.error("Update error:", error);
            res.status(500).json({ error: error.message });
        }
    },
    // Delete an image by image_id
    deleteImage: async (req, res) => {
        try {
            const { id } = req.body;
            const deleted = await Glasses_images.destroy({
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
};

module.exports = glassesController;
