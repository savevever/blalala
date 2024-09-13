require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const path = require('path');
const http = require('http');
const WebSocket = require('ws');
const { sequelize } = require('./src/configs/database');
const initializePassport = require('./src/components/passportConfig');
const userRoutes = require('./src/routes/User');
const productRoutes = require('./src/routes/products');
const shopRoutes = require('./src/routes/shop');
const sellingRoutes = require('./src/routes/selling');
const payment = require('./src/routes/2c2p');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        sameSite: 'None' 
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync({ alter: true });
        initializePassport(passport, sequelize.models.User);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
app.use(express.static(path.join(__dirname, 'dist'), {
    cacheControl: false,
    etag: false
  }));

// WebSocket Server
wss.on('connection', (ws) => {
    console.log('New client connected');
    ws.on('message', (message) => {
        console.log(`Received message => ${message}`);
    });
    ws.send('Hello! Message From Server!!');
});

// Routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/shop', shopRoutes);
app.use('/selling', sellingRoutes);
app.use('/2c2p', payment);
app.get('/', (req, res) => res.send('Welcome to the API'));

app.post('/users/PurchaseHistory', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 8081;
server.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);
    await initializeDatabase();
});
server.js

