// server.js
require('dotenv').config();  const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');  const session = require('express-session');
const flash = require('express-flash');  const passport = require('passport');
const initializePassport = require('./src/components/passportConfig');  const path = require('path');
const http = require('http');  const WebSocket = require('ws');  const app = express();
const server = http.createServer(app);  const wss = new WebSocket.Server({ server });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Static file serving
app.use(express.static(path.join(__dirname, 'public')));
// Database connection and models
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/dev');
let User, Product,Shop;

async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        User = sequelize.define('User', {
            name: { type: DataTypes.STRING },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: { type: DataTypes.STRING, allowNull: false },
            ConfirmPassword: { type: DataTypes.STRING, allowNull: false },
            Balance: { type: DataTypes.INTEGER, allowNull: false },
            role: { type: DataTypes.STRING, allowNull: false }
        });
        Product = sequelize.define('Product', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            name: { type: DataTypes.STRING, allowNull: false },
            price: { type: DataTypes.FLOAT, allowNull: false },
            stock: { type: DataTypes.INTEGER, allowNull: false },
            totalSales: { type: DataTypes.FLOAT, allowNull: false },
            numberOfOrders: { type: DataTypes.INTEGER, allowNull: false },
            itemsSold: { type: DataTypes.INTEGER, allowNull: false },
            cogs: { type: DataTypes.FLOAT, allowNull: false },
            shippingCosts: { type: DataTypes.FLOAT, allowNull: false },
            day: { type: DataTypes.INTEGER, allowNull: false },
            month: { type: DataTypes.STRING, allowNull: false },
            year: { type: DataTypes.INTEGER, allowNull: false }
        });
        Shop = sequelize.define('Shop', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            imageSource: { type: DataTypes.STRING, allowNull: false },
            title: { type: DataTypes.STRING, allowNull: false },
            option: { type: DataTypes.STRING, allowNull: false },
            Category: { type: DataTypes.STRING, allowNull: false },
            price: { type: DataTypes.INTEGER, allowNull: false },
            soldCount: { type: DataTypes.INTEGER, allowNull: false },
            seller: { type: DataTypes.STRING, allowNull: false },
            name: { type: DataTypes.STRING, allowNull: false },
           
        });
        await sequelize.sync({ alter: true });
        initializePassport(passport, User);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

// WebSocket Server
wss.on('connection', (ws) => {
    console.log('New client connected');
    ws.on('message', (message) => {
        console.log(`Received message => ${message}`);
    });
    ws.send('Hello! Message From Server!!');
});

// Routes
// app.get('/', (req, res) => res.send('Welcome to the API'));
// app.get('/users/login', (req, res) => res.render('login'));
// app.get('/users/home-login', (req, res) => res.render('home-login', { user: req.user.name }));

// CRUD routes for users
app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Error fetching users');
    }
});

app.post('/users/register', async (req, res) => {
    const { name, email, password, ConfirmPassword, Balance, role } = req.body;
    try {
        const newUser = await User.create({
            name,
            email,
            password,
            ConfirmPassword,
            Balance,
            role
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).send('Error during registration');
    }
});

app.post('/users/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).send('Error logging in user');
    }
});

app.post('/createUsers', async (req, res) => {
    const { firstName, lastName, dailyProfit, product, day, month } = req.body;
    try {
        const newProduct = await Product.create({
            firstName,
            lastName,
            dailyProfit,
            product,
            day,
            month
        });
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Error creating user');
    }
});

app.get('/users/:firstName', async (req, res) => {
    try {
        const user = await User.findOne({ where: { firstName: req.params.firstName } });
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Error fetching user');
    }
});

// CRUD routes for products
app.post('/products', async (req, res) => {
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

app.get('/products', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Error fetching products');
    }
});

app.delete('/products', async (req, res) => {
    try {
        await Product.destroy({ where: {} });
        res.status(200).send('All products have been deleted.');
    } catch (error) {
        console.error('Error deleting products:', error);
        res.status(500).send('Error deleting products');
    }
});

// Item routes
const items = [
    { id: 1, imageSource: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGcPEga9g5PeWG7E0XTnnS2vJpjZDBdmwqIg&s", 
        title: "Product Title 1", option: 'size', Category: ['L', 'M', 'S'], price: 245, soldCount: 2450,
        seller: 'seller1', name: 'Product Name 1' },
];

app.get('/seller/item', async (req, res) => {
    try {
        const items = await Shop.findAll();
        res.json(items);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).send('Error fetching items');
    }
});

app.post('/seller/createItem', async (req, res) => {
    const { id,imageSource, title, option, Category, price, soldCount, seller, name } = req.body;
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


app.delete('/seller/item/:id', (req, res) => {
    const { id } = req.params;
    const index = items.findIndex(item => item.id == id);
    if (index !== -1) {
        items.splice(index, 1);
        res.status(200).json({ message: `Item with id ${id} deleted successfully` });
    } else {
        res.status(404).json({ message: `Item with id ${id} not found` });
    }
});

// Server setup
const PORT = process.env.PORT || 8081;
server.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);
    await initializeDatabase();
});
