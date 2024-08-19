require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/dev');

const User = sequelize.define('User', {
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    ConfirmPassword: { type: DataTypes.STRING, allowNull: false },
    Balance: { type: DataTypes.INTEGER, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false }
});

const Product = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
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

const Shop = sequelize.define('Shop', {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    imageSource: { type: DataTypes.STRING, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    option: { type: DataTypes.STRING, allowNull: false },
    Category: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    soldCount: { type: DataTypes.INTEGER, allowNull: false },
    seller: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
});

const Selling = sequelize.define('Selling', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    shopName: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: true, validate: { isEmail: true } },
    phoneNumber: { type: DataTypes.STRING, allowNull: true, validate: { len: [10, 10] } },
    sellerType: { type: DataTypes.STRING, allowNull: true },
    prefix: { type: DataTypes.ENUM('individual', 'corporate'), allowNull: true },
    otherPrefix: { type: DataTypes.STRING, allowNull: true },
    firstname: { type: DataTypes.STRING, allowNull: true },
    lastname: { type: DataTypes.STRING, allowNull: true },
    idCardNumber: { type: DataTypes.STRING, allowNull: true },
    birthday: { type:  DataTypes.DATEONLY, allowNull: true },
    province: { type: DataTypes.STRING, allowNull: true },
    amphoe: { type: DataTypes.STRING, allowNull: true },
    district: { type: DataTypes.STRING, allowNull: true },
    zipcode: { type: DataTypes.STRING, allowNull: true },
    addressDetails: { type: DataTypes.STRING, allowNull: true },
    idCardImages: { type: DataTypes.STRING, allowNull: true },
    pairIdCardImages: { type: DataTypes.STRING, allowNull: true },
    corporateType: { type: DataTypes.STRING, allowNull: true },
    corporateName: { type: DataTypes.STRING, allowNull: true },
    corporateRegistrationNumber: { type: DataTypes.STRING, allowNull: true },
    provinceCorporate: { type: DataTypes.STRING, allowNull: true },
    amphoeCorporate: { type: DataTypes.STRING, allowNull: true },
    districtCorporate: { type: DataTypes.STRING, allowNull: true },
    zipcodeCorporate: { type: DataTypes.STRING, allowNull: true },
    detailsCorporate: { type: DataTypes.STRING, allowNull: true },
    companyCertificateImages: { type: DataTypes.STRING, allowNull: true },
    directorIdCardImages: { type: DataTypes.STRING, allowNull: true },


});

const ProductTest = sequelize.define('ProductTest', {
    id: { 
        type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true 
    },
    images: { 
        type: DataTypes.JSONB, allowNull: false 
    },
    nameProduct: { 
        type: DataTypes.STRING, allowNull: false 
    },
    category: { 
        type: DataTypes.STRING, allowNull: true 
    },
    otherCategory: { 
        type: DataTypes.STRING, allowNull: true 
    },
    productDetails: { 
        type: DataTypes.TEXT, allowNull: true 
    },
    productTypes: { 
        type: DataTypes.JSONB, allowNull: true 
    },

});
module.exports = { sequelize, User, Product, Shop, Selling,ProductTest };
