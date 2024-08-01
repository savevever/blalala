// // routes.js
// const express = require('express');
// const router = express.Router();
// const { User, Product, Shop } = require('../../server');  // ใช้การส่งออกจากไฟล์ server.js

// // Routes
// router.get('/', (req, res) => res.send('Welcome to the API'));
// router.get('/users/login', (req, res) => res.render('login'));
// router.get('/users/home-login', (req, res) => res.render('home-login', { user: req.user.name }));

// // CRUD routes for users
// router.get('/users', async (req, res) => {
//     try {
//         const users = await User.findAll();
//         res.json(users);
//     } catch (error) {
//         console.error('Error fetching users:', error);
//         res.status(500).send('Error fetching users');
//     }
// });

// router.post('/users/register', async (req, res) => {
//     const { name, email, password, ConfirmPassword, Balance, role } = req.body;
//     try {
//         const newUser = await User.create({
//             name,
//             email,
//             password,
//             ConfirmPassword,
//             Balance,
//             role
//         });
//         res.status(201).json(newUser);
//     } catch (error) {
//         console.error('Error during registration:', error);
//         res.status(500).send('Error during registration');
//     }
// });

// router.post('/users/login', async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const user = await User.findOne({ where: { email } });
//         if (!user || user.password !== password) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }
//         res.status(200).json({ message: 'Login successful', user });
//     } catch (error) {
//         console.error('Error logging in user:', error);
//         res.status(500).send('Error logging in user');
//     }
// });

// router.post('/createUsers', async (req, res) => {
//     const { firstName, lastName, dailyProfit, product, day, month } = req.body;
//     try {
//         const newProduct = await Product.create({
//             firstName,
//             lastName,
//             dailyProfit,
//             product,
//             day,
//             month
//         });
//         res.status(201).json(newProduct);
//     } catch (error) {
//         console.error('Error creating user:', error);
//         res.status(500).send('Error creating user');
//     }
// });

// router.get('/users/:firstName', async (req, res) => {
//     try {
//         const user = await User.findOne({ where: { firstName: req.params.firstName } });
//         if (user) {
//             res.json(user);
//         } else {
//             res.status(404).send('User not found');
//         }
//     } catch (error) {
//         console.error('Error fetching user:', error);
//         res.status(500).send('Error fetching user');
//     }
// });

// // CRUD routes for products
// router.post('/products', async (req, res) => {
//     const { id, name, price, stock, totalSales, numberOfOrders, itemsSold, cogs, shippingCosts, day, month, year } = req.body;
//     try {
//         const newProduct = await Product.create({
//             id,
//             name,
//             price,
//             stock,
//             totalSales,
//             numberOfOrders,
//             itemsSold,
//             cogs,
//             shippingCosts,
//             day,
//             month,
//             year
//         });
//         console.log("Product created successfully");
//         res.status(201).json(newProduct);
//     } catch (error) {
//         console.error('Error creating product:', error);
//         res.status(500).send('Error creating product');
//     }
// });

// router.get('/products', async (req, res) => {
//     try {
//         const products = await Product.findAll();
//         res.json(products);
//     } catch (error) {
//         console.error('Error fetching products:', error);
//         res.status(500).send('Error fetching products');
//     }
// });

// router.delete('/products', async (req, res) => {
//     try {
//         await Product.destroy({ where: {} });
//         res.status(200).send('All products have been deleted.');
//     } catch (error) {
//         console.error('Error deleting products:', error);
//         res.status(500).send('Error deleting products');
//     }
// });

// // Item routes using Shop model
// router.get('/seller/item', async (req, res) => {
//     try {
//         const items = await Shop.findAll();
//         res.json(items);
//     } catch (error) {
//         console.error('Error fetching items:', error);
//         res.status(500).send('Error fetching items');
//     }
// });

// router.post('/seller/createItem', async (req, res) => {
//     const { imageSource, title, option, Category, price, soldCount, seller, name } = req.body;

//     if (!imageSource || !title || !option || !Category || !price || !soldCount || !seller || !name) {
//         return res.status(400).json({ message: 'All fields are required' });
//     }

//     try {
//         const newItem = await Shop.create({
//             imageSource,
//             title,
//             option,
//             Category,
//             price,
//             soldCount,
//             seller,
//             name
//         });
//         res.status(201).json(newItem);
//     } catch (error) {
//         console.error('Error creating item:', error);
//         res.status(500).send('Error creating item');
//     }
// });

// router.delete('/seller/item/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const item = await Shop.findByPk(id);
//         if (item) {
//             await item.destroy();
//             res.status(200).json({ message: `Item with id ${id} deleted successfully` });
//         } else {
//             res.status(404).json({ message: `Item with id ${id} not found` });
//         }
//     } catch (error) {
//         console.error('Error deleting item:', error);
//         res.status(500).send('Error deleting item');
//     }
// });

// console.log('User model:', User);
// console.log('Product model:', Product);
// console.log('Shop model:', Shop);

// module.exports = router;
