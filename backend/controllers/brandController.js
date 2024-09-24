const { Brand } = require('../models');

const brandController = {
    async addNewBrand(req, res) { 
        try {
            const newBrand = await Brand.create(req.body);
            res.status(201).json(newBrand);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}