const express = require('express');
const router = express.Router();
const { Product } = require('../configs/database');

router.post('/', async (req, res) => {
    const { id, name, price, stock, totalSales, numberOfOrders, itemsSold, cogs, shippingCosts, day, month, year } = req.body;
    try {
        const newProduct = await Product.create({
            id,
            name,
            price,
            stock,
            totalSales,
            numberOfOrders,
            itemsSold,
            cogs,
            shippingCosts,
            day,
            month,
            year
        });
        console.log("Product created successfully");
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).send('Error creating product');
    }
});

router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Error fetching products');
    }
});

router.delete('/', async (req, res) => {
    try {
        await Product.destroy({ where: {} });
        res.status(200).send('All products have been deleted.');
    } catch (error) {
        console.error('Error deleting products:', error);
        res.status(500).send('Error deleting products');
    }
});

module.exports = router;
