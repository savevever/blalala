require('dotenv').config();
const crypto = require('crypto');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/dev');

const User = sequelize.define('User', {
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    ConfirmPassword: { type: DataTypes.STRING, allowNull: false },
    Balance: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 5000 },
    role: { type: DataTypes.STRING, allowNull: false, defaultValue: "user" }
});

const Product = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true }, name: { type: DataTypes.STRING, allowNull: false },
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

const Selling = sequelize.define('Selling', {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    shopName: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: true, validate: { isEmail: true } },
    phoneNumber: { type: DataTypes.STRING, allowNull: true, validate: { len: [10, 10] } },
    sellerType: { type: DataTypes.STRING, allowNull: true },
    prefix: { type: DataTypes.ENUM('individual', 'corporate'), allowNull: true },
    otherPrefix: { type: DataTypes.STRING, allowNull: true },
    firstname: { type: DataTypes.STRING, allowNull: true },
    lastname: { type: DataTypes.STRING, allowNull: true },
    idCardNumber: { type: DataTypes.STRING, allowNull: true },
    birthday: { type: DataTypes.DATEONLY, allowNull: true },
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
const Shop = sequelize.define('Shop', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    image: { type: DataTypes.STRING, allowNull: true },
    shopName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: true },
    phoneNumber: { type: DataTypes.STRING, allowNull: false },
    shopId: { type: DataTypes.STRING, allowNull: false, unique: true },
    like: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
    follow: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
    followedBy: { type: DataTypes.JSONB, allowNull: true, defaultValue: [] }
});
const ProductTest = sequelize.define('ProductTest', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: () => crypto.randomUUID()
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
    price: {
        type: DataTypes.FLOAT, allowNull: true
    },
    numberProducts: {
        type: DataTypes.INTEGER, allowNull: true
    },
    imageList: {
        type: DataTypes.JSONB,
        allowNull: false,
    }, shopId: {
        type: DataTypes.STRING,
        references: {
            model: Shop, // ชื่อโมเดลที่เชื่อมโยง
            key: 'shopId' // ฟิลด์ในโมเดล Shop ที่ใช้เชื่อมโยง
        },
        allowNull: false
    }, 
}, 
// {
//     hooks: {
//         beforeCreate: (product) => {
//             product.invoiceNo = product.id; 
//         }
//     }
// }
);
const history = sequelize.define('history', {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    productId: { type: DataTypes.STRING, allowNull: true },
    image: { type: DataTypes.TEXT, allowNull: true },
    nameProduct: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: true },
    shopId: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: true },
    quantity: { type: DataTypes.INTEGER, allowNull: true },
    productTypes: { type: DataTypes.STRING, allowNull: true },
});

const cart = sequelize.define('cart', {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    productId: { type: DataTypes.STRING, allowNull: true },
    image: { type: DataTypes.TEXT, allowNull: true },
    nameProduct: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: true },
    shopId: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: true },
    quantity: { type: DataTypes.INTEGER, allowNull: true },
    productTypes: { type: DataTypes.STRING, allowNull: true },
});
const Payment = sequelize.define('Payment', {
    accountNo: { type: DataTypes.STRING, allowNull: true },
    customerToken: { type: DataTypes.STRING, allowNull: true },
    processBy: { type: DataTypes.STRING, allowNull: false },
    paymentID: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    merchantID: { type: DataTypes.STRING, allowNull: false },
    invoiceNo: { type: DataTypes.STRING, allowNull: false },
    ProductID: { type: DataTypes.STRING, allowNull: false },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    currencyCode: { type: DataTypes.STRING, allowNull: false },
    tranRef: { type: DataTypes.STRING, allowNull: false },
    transactionDateTime: { type: DataTypes.STRING, allowNull: false },
    issuerCountry: { type: DataTypes.STRING, allowNull: true },
    issuerBank: { type: DataTypes.STRING, allowNull: true },
    cardType: { type: DataTypes.STRING, allowNull: true },
    respCode: { type: DataTypes.STRING, allowNull: false },
    respDesc: { type: DataTypes.STRING, allowNull: true }
}, {});

// การสร้างความสัมพันธ์
Shop.hasMany(ProductTest, { foreignKey: 'shopId', sourceKey: 'shopId' });
ProductTest.belongsTo(Shop, { foreignKey: 'shopId', targetKey: 'shopId' });
module.exports = { sequelize, User, Product, Shop, Selling, ProductTest, history, cart, Payment };
