const express = require('express');
const router = express.Router();
const { Product, history, cart ,comment} = require('../configs/database');

router.post('/createGraph', async (req, res) => {
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

router.get('/getGraph', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Error fetching products');
    }
});

router.delete('/delGraph', async (req, res) => {
    try {
        await Product.destroy({ where: {} });
        res.status(200).send('All products have been deleted.');
    } catch (error) {
        console.error('Error deleting products:', error);
        res.status(500).send('Error deleting products');
    }
});
router.post('/createHistoryEntry', async (req, res) => {
    const { productId, image, email, nameProduct, shopId, price, quantity, productTypes } = req.body;
    try {
        console.log('Request Body:', req.body);
        if (!productId || !nameProduct || !shopId || price === undefined || quantity === undefined) {
            throw new Error('Missing required fields');
        }
        const newHistoryEntry = await history.create({
            productId,
            image,
            email,
            nameProduct,
            shopId,
            price: parseFloat(price),
            quantity: parseInt(quantity, 10),
            productTypes
        });

        console.log("Entry created successfully in history");
        res.status(201).json(newHistoryEntry);
    } catch (error) {
        console.error('Error creating history entry:', error.message);
        console.error('Error stack:', error.stack);
        res.status(500).json({ error: 'Error creating history entry' });
    }
});
router.post('/createComment', async (req, res) => {
    const { nameProduct, imageProduct, price, detail, imageComment, star, shopId, email } = req.body;
    try {
        const newHistoryEntry = await comment.create({
            nameProduct,
            imageProduct,
            price,
            detail,
            imageComment,
            star,
            shopId,
            email
        });

        console.log("Entry created successfully in history");
        res.status(201).json(newHistoryEntry);
    } catch (error) {
        console.error('Error creating history entry:', error.message);
        console.error('Error stack:', error.stack);
        res.status(500).json({ error: 'Error creating history entry' });
    }
});
router.get('/getComments/', async (req, res) => {
    try {
        const comments = await comment.findAll(); // ดึงคอมเมนต์ทั้งหมด

        if (comments.length === 0) {
            return res.status(404).json({ message: 'No comments found.' });
        }

        console.log("Comments retrieved successfully.");
        res.status(200).json(comments);
    } catch (error) {
        console.error('Error retrieving comments:', error.message);
        console.error('Error stack:', error.stack);
        res.status(500).json({ error: 'Error retrieving comments' });
    }
});


router.post('/createCartEntry', async (req, res) => {
    const { productId, image, email, nameProduct, shopId, price, quantity, productTypes } = req.body;
    try {
        console.log('Request Body:', req.body);
        if (!productId || !nameProduct || !shopId || price === undefined || quantity === undefined) {
            throw new Error('Missing required fields');
        }
        const newcartEntry = await cart.create({
            productId,
            image,
            email,
            nameProduct,
            shopId,
            price: parseFloat(price),
            quantity: parseInt(quantity, 10),
            productTypes
        });

        console.log("Entry created successfully in history");
        res.status(201).json(newcartEntry);
    } catch (error) {
        console.error('Error creating history entry:', error.message);
        console.error('Error stack:', error.stack);
        res.status(500).send('Error creating history entry');
    }
});
router.get('/getHistory', async (req, res) => {
    try {
        const historyEntries = await history.findAll();
        res.json(historyEntries);
    } catch (error) {
        console.error('Error fetching history entries:', error);
        res.status(500).send('Error fetching history entries');
    }
});

// GET: ดึงข้อมูลจาก cart
router.get('/getCart', async (req, res) => {
    try {
        const cartEntries = await cart.findAll();
        res.json(cartEntries);
    } catch (error) {
        console.error('Error fetching cart entries:', error);
        res.status(500).send('Error fetching cart entries');
    }
});

// DELETE: ลบข้อมูลทั้งหมดจาก history
router.delete('/delHistory', async (req, res) => {
    try {
        await history.destroy({ where: {} });
        res.status(200).send('All history entries have been deleted.');
    } catch (error) {
        console.error('Error deleting history entries:', error);
        res.status(500).send('Error deleting history entries');
    }
});

// DELETE: ลบข้อมูลทั้งหมดจาก cart
router.delete('/delCart', async (req, res) => {
    try {
        await cart.destroy({ where: {} });
        res.status(200).send('All cart entries have been deleted.');
    } catch (error) {
        console.error('Error deleting cart entries:', error);
        res.status(500).send('Error deleting cart entries');
    }
});
// DELETE: ลบข้อมูลเฉพาะรายการจาก history
router.delete('/delHistory/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRows = await history.destroy({ where: { id } });
        
        if (deletedRows === 0) {
            return res.status(404).send('No matching entry found to delete.');
        }

        res.status(200).send('History entry has been deleted.');
    } catch (error) {
        console.error('Error deleting history entry:', error);
        res.status(500).send('Error deleting history entry');
    }
});
router.delete('/delCart/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRows = await cart.destroy({ where: { id } });
        
        if (deletedRows === 0) {
            return res.status(404).send('No matching entry found to delete.');
        }

        res.status(200).send('cart entry has been deleted.');
    } catch (error) {
        console.error('Error deleting cart entry:', error);
        res.status(500).send('Error deleting cart entry');
    }
});
module.exports = router;
