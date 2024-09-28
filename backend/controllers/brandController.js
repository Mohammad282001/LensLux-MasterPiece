const { Brands } = require("../models")
const brandController = {
    addNewBrand: async (req, res) => {
        const { brand_name, brand_image } = req.body;
        try {
            // check if the brand is already exist or not for error handling 
            const existingBrand = await Brands.findOne({ where: { brand_name } });
            if (existingBrand) {
                return res.status(400).json({ error: "Brand is already exist" })
            }
            //create new brand
            const newBrand = await Brands.create({
                brand_name,
                brand_image
            });
            res.status(201).json(newBrand);

        } catch (error) {
            console.log("Error in adding new Brand", error)
            res.error(400).json({ error: error.message })

        }
    },
    //get all brands
    getBrands: async (req, res) => {
        try {
            const brands = await Brands.findAll();
            res.status(201).json(brands);
        } catch (error) {
            console.log("error while getting the brands", error)
            res.error(400).json({ error: error.message })
        }
    }
}

module.exports = brandController;