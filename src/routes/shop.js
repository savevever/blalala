const express = require('express');
const router = express.Router();
const { Shop } = require('../configs/database');
const items = [
    {
        id: 1, imageSource: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGcPEga9g5PeWG7E0XTnnS2vJpjZDBdmwqIg&s",
        title: "Product Title 1", option: 'size', Category: ['L', 'M', 'S'], price: 245, soldCount: 2450,
        seller: 'seller1', name: 'Product Name 1'
    },
];

router.get('/item', async (req, res) => {
    try {
        const items = await Shop.findAll();
        res.json(items);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).send('Error fetching items');
    }
});

router.post('/createItem', async (req, res) => {
    const { id, imageSource, title, option, Category, price, soldCount, seller, name } = req.body;
    try {
        const newItem = await Shop.create({
            id,
            imageSource,
            title,
            option,
            Category,
            price,
            soldCount,
            seller,
            name
        });
        res.status(201).json(newItem);
    } catch (error) {
        console.error('Error creating item:', error);
        res.status(500).send('Error creating item');
    }
});

router.delete('/item/:id', (req, res) => {
    const { id } = req.params;
    const index = items.findIndex(item => item.id == id);
    if (index !== -1) {
        items.splice(index, 1);
        res.status(200).json({ message: `Item with id ${id} deleted successfully` });
    } else {
        res.status(404).json({ message: `Item with id ${id} not found` });
    }
});

module.exports = router;
