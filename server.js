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
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
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
// Database connection and initialization
async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync({ force: true });
        initializePassport(passport, sequelize.models.User);
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
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/shop', shopRoutes);
app.use('/selling', sellingRoutes);
app.get('/', (req, res) => res.send('Welcome to the API'));

// Server setup
const PORT = process.env.PORT || 8081;
server.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);
    await initializeDatabase();
});
