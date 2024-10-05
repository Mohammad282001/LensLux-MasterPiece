const { Glasses, Brands, Glasses_images, Glasses_details, Products } = require('../models');

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
                category,
                type,
                sub_type,
                stock_quantity,
                has_virtual_try_on,
                virtual_try_on_data,
                frame_shape,
                face_frame_shape,
                color_name,
                color_hex,
            } = req.body;

            // Check if the brand_id exists
            const brand = await Brands.findByPk(brand_id);
            if (!brand) {
                return res.status(400).json({
                    error: 'Invalid brand_id',
                    details: 'Brand with the provided id does not exist'
                });
            }

            // Validate category
            const validAudiences = ['men', 'women', 'unisex', 'kids'];
            if (!validAudiences.includes(category)) {
                return res.status(400).json({
                    error: 'Invalid target audience',
                    details: `Target audience must be one of: ${validAudiences.join(', ')}`
                });
            }

            // Validate type
            const validCategories = ['eyeglasses', 'sunglasses'];
            if (!validCategories.includes(type)) {
                return res.status(400).json({
                    error: 'Invalid type',
                    details: `type must be one of: ${validCategories.join(', ')}`
                });
            }

            const frame = await Glasses.create({
                brand_id,
                model,
                description,
                price,
                discount_price,
                discount_percentage,
                category,
                type,
                sub_type,
                stock_quantity,
                has_virtual_try_on,
                virtual_try_on_data,
                frame_shape,
                face_frame_shape,
                color_name,
                color_hex
            });

            await Products.create({
                product_id: frame.glasses_id, // Associate the new glasses with the product
                product_type: 'Glasses'           // Specify the type as 'Glasses'
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
                    },
                    {
                        model: Glasses_details,
                        as: 'details',
                        attributes: ['lens_width', 'bridge_width', "temple_length", "lens_height", "total_width", "weight", "frame_material", "lens_type"]
                    }
                ]
            });
            res.status(200).json(glasses);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve glasses', details: error.message });
        }
    },

    // getByCategoryAndType: async (req, res) => {
    //     const { type, category } = req.query;
    //     try {
    //         const glasses = await Glasses.findAll({
    //             where: {
    //                 type: type,
    //                 category: category
    //             },
    //             include: [
    //                 {
    //                     model: Brands,
    //                     as: 'brand',
    //                     attributes: ['brand_name', 'brand_image']
    //                 },
    //                 {
    //                     model: Glasses_images,
    //                     as: 'images',
    //                     attributes: ['image_url', 'image_type']
    //                 },
    //                 {
    //                     model: Glasses_details,
    //                     as: 'details',
    //                     attributes: ['lens_width', 'bridge_width', 'temple_length', 'lens_height', 'total_width', 'weight', 'frame_material', 'lens_type']
    //                 }
    //             ]
    //         });
    //         res.status(200).json(glasses);
    //     } catch (error) {
    //         res.status(500).json({ message: "Server error", error: error.message });
    //     }
    // },
    // getByType: async (req, res) => {
    //     const { type } = req.query;
    //     try {
    //         const glasses = await Glasses.findAll({
    //             where: {
    //                 type: type,
    //             },
    //             include: [
    //                 {
    //                     model: Brands,
    //                     as: 'brand',
    //                     attributes: ['brand_name', 'brand_image']
    //                 },
    //                 {
    //                     model: Glasses_images,
    //                     as: 'images',
    //                     attributes: ['image_url', 'image_type']
    //                 },
    //                 {
    //                     model: Glasses_details,
    //                     as: 'details',
    //                     attributes: ['lens_width', 'bridge_width', 'temple_length', 'lens_height', 'total_width', 'weight', 'frame_material', 'lens_type']
    //                 }
    //             ]
    //         });
    //         res.status(200).json(glasses);
    //     } catch (error) {
    //         res.status(500).json({ message: "Server error", error: error.message });
    //     }
    // },
    getByCategoryAndTypeOrType: async (req, res) => {
        const { type, category } = req.query;
        try {
            let whereClause = {};

            // Add conditions based on the presence of query parameters
            if (type) whereClause.type = type;
            if (category) whereClause.category = category;

            const glasses = await Glasses.findAll({
                where: whereClause,
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
                    },
                    {
                        model: Glasses_details,
                        as: 'details',
                        attributes: ['lens_width', 'bridge_width', 'temple_length', 'lens_height', 'total_width', 'weight', 'frame_material', 'lens_type']
                    }
                ]
            });
            res.status(200).json(glasses);
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
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
                    },
                    {
                        model: Glasses_details,
                        as: 'details',
                        attributes: ['lens_width', 'bridge_width', "temple_length", "lens_height", "total_width", "weight", "frame_material", "lens_type"]
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
                category,
                type,
                sub_type,
                stock_quantity,
                has_virtual_try_on,
                virtual_try_on_data,
                frame_shape,
                face_frame_shape,
                color_name,
                color_hex
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

            // Validate category
            const validAudiences = ['men', 'women', 'unisex', 'kids'];
            if (!validAudiences.includes(category)) {
                return res.status(400).json({
                    error: 'Invalid target audience',
                    details: `Target audience must be one of: ${validAudiences.join(', ')}`
                });
            }

            // Validate type
            const validCategories = ['eyeglasses', 'sunglasses'];
            if (!validCategories.includes(type)) {
                return res.status(400).json({
                    error: 'Invalid type',
                    details: `type must be one of: ${validCategories.join(', ')}`
                });
            }

            await glasses.update({
                brand_id,
                model,
                description,
                price,
                discount_price,
                discount_percentage,
                category,
                type,
                sub_type,
                stock_quantity,
                has_virtual_try_on,
                virtual_try_on_data,
                frame_shape,
                face_frame_shape,
                color_name,
                color_hex
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
            const glassesFromProducts = await Products.findByPk(id);
            if (!glasses) {
                return res.status(404).json({ error: 'Glasses not found' });
            }
            if (!glassesFromProducts) {
                return res.status(404).json({ error: 'Glasses not found in products' });
            }

            // Delete the glasses
            await glasses.destroy();
            await glassesFromProducts.destroy();


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
            const { id } = req.params;

            const glasses = await Glasses.findByPk(id);
            if (!glasses) {
                return res.status(404).json({ error: 'Glasses not found' });
            }

            // Delete related Glasses_details records first
            await Glasses_details.destroy({ where: { glasses_id: id } });

            // Now delete the glasses
            await glasses.destroy();

            res.status(200).json({ message: 'Glasses deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete glasses', details: error.message });
        }
    },
};

module.exports = glassesController;
