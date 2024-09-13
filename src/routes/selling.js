const express = require('express');
const crypto = require('crypto');

const router = express.Router();
const { Selling,ProductTest } = require('../configs/database');
router.post('/users/FormOneSeller', (req, res) => {
    res.json({ message: 'Form One Seller Page' });
});

router.post('/save-data', async (req, res) => {
    try {
        // ดึงข้อมูลจาก request body
        const { shopName, email,phoneNumber} = req.body;
        // บันทึกข้อมูลลงในฐานข้อมูล PostgreSQL โดยใช้โมเดล Selling
        const newSelling = await Selling.create({
            shopName,email,phoneNumber
            
        });
        // ส่ง response กลับไปที่ client พร้อมข้อมูลที่ถูกบันทึก
        res.status(200).json({ message: 'Data saved successfully', data: newSelling });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ message: 'Failed to save data' });
    }
});
router.get('/view-data', async (req, res) => {
    try {
        // ดึงข้อมูลทั้งหมดจากตาราง Selling
        const allSellings = await Selling.findAll();

        // ส่งข้อมูลไปยัง client
        res.status(200).json({ message: 'Data retrieved successfully', data: allSellings });
    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ message: 'Failed to retrieve data' });
    }
});

router.delete('/delete-all', async (req, res) => {
    try {
        // ลบข้อมูลทั้งหมดในตาราง Selling
        await Selling.destroy({ where: {}, truncate: true });

        // ส่ง response กลับไปที่ client
        res.status(200).json({ message: 'All data deleted successfully' });
    } catch (error) {
        console.error('Error deleting data:', error);
        res.status(500).json({ message: 'Failed to delete data' });
    }
});
router.post('/save-product-data', async (req, res) => {
    console.log('Received request body:', req.body); // เพิ่มการล็อกที่นี่
    try {
        const productData = {
            ...req.body,
            images: JSON.parse(req.body.images), // แปลง JSON string กลับเป็นอาร์เรย์
            productTypes: JSON.parse(req.body.productTypes), // แปลง JSON string กลับเป็นอาร์เรย์
            imageList: JSON.parse(req.body.imageList), // แปลง JSON string กลับเป็นอาร์เรย์
        };

        console.log('Product data to be saved:', productData); // ตรวจสอบข้อมูลที่ถูกแปลง
        if (!productData.id) {
            productData.id = crypto.randomUUID(); // สร้าง UUID ถ้าไม่มี id
        }
        // บันทึกข้อมูลลงในฐานข้อมูล PostgreSQL
        await ProductTest.create(productData);

        res.status(200).json({ message: 'บันทึกข้อมูลลง PostgreSQL สำเร็จ' });
    } catch (err) {
        console.error('ข้อผิดพลาดในการบันทึกข้อมูลลง PostgreSQL:', err);
        res.status(500).json({ message: 'ไม่สามารถบันทึกข้อมูลได้' });
    }
});

router.get('/productss', async (req, res) => {
    try {
        const products = await ProductTest.findAll();
        res.status(200).json(products);
    } catch (err) {
        console.error('ข้อผิดพลาดในการดึงข้อมูลจาก PostgreSQL:', err);
        res.status(500).json({ message: 'ไม่สามารถดึงข้อมูลได้' });
    }
});

router.get('/product/latest', async (req, res) => {
    try {
        // ดึงข้อมูลผลิตภัณฑ์ที่มี id สูงสุด (หรือข้อมูลล่าสุด)
        const latestProduct = await ProductTest.findOne({
            order: [['id', 'DESC']], // สั่งให้ค้นหา id ที่มีค่ามากที่สุด
        });
        if (latestProduct) {
            res.status(200).json(latestProduct);
        } else {
            res.status(404).json({ message: 'ไม่พบผลิตภัณฑ์' });
        }
    } catch (err) {
        console.error('ข้อผิดพลาดในการดึงข้อมูลจาก PostgreSQL:', err);
        res.status(500).json({ message: 'ไม่สามารถดึงข้อมูลได้' });
    }
});
router.delete('/Delateproducts', async (req, res) => {
    try {
        // ลบข้อมูลทั้งหมดจากตาราง ProductTest
        await ProductTest.destroy({
            where: {}, // ไม่มีเงื่อนไข where หมายถึงลบข้อมูลทั้งหมด
            truncate: true // ใช้ truncate เพื่อลบข้อมูลทั้งหมดและรีเซ็ตการนับ ID
        });

        res.status(200).json({ message: 'ลบข้อมูลทั้งหมดสำเร็จ' });
    } catch (err) {
        console.error('ข้อผิดพลาดในการลบข้อมูลทั้งหมดจาก PostgreSQL:', err);
        res.status(500).json({ message: 'ไม่สามารถลบข้อมูลทั้งหมดได้' });
    }
});
router.delete('/products/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        console.log('Product ID ที่ได้รับ:', productId);
        const product = await ProductTest.findByPk(productId);

        if (!product) {
            return res.status(404).json({ message: 'ไม่พบสินค้าที่คุณต้องการลบ' });
        }

        await product.destroy();
        res.status(200).json({ message: 'ลบสินค้าสำเร็จ' });
    } catch (err) {
        console.error('ข้อผิดพลาดในการลบข้อมูลจาก PostgreSQL:', err);
        res.status(500).json({ message: 'ไม่สามารถลบข้อมูลได้' });
    }
});

router.use(express.json({ limit: '50mb' })); // Adjust the limit as needed
router.use(express.urlencoded({ limit: '50mb', extended: true }));

router.post('/users/salesPage', async (req, res) => {
    try {
        // ดึงข้อมูลทั้งหมดจากตาราง Selling
        const products = await Selling.findAll();

        // ส่งข้อมูลไปยังหน้า sales-page
        res.json({ message: 'Sales Page Data', products });
    } catch (err) {
        console.error('Error retrieving data from PostgreSQL:', err);
        return res.status(500).send('Error retrieving data');
    }
});




router.post('/users/FormTwoSeller', async (req, res) => {
    try {
        // ดึงข้อมูลทั้งหมดจากตาราง Selling
        const data = await Selling.findAll();

        // ส่งข้อมูลไปยังหน้า form-two-seller
        res.json({ message: 'Form Two Seller Data', products: data });
    } catch (err) {
        console.error('Error retrieving data from PostgreSQL:', err);
        return res.status(500).send('Error retrieving data');
    }
});

router.post('/users/FormThreeSeller', (req, res) => {
    res.json({ message: 'Form Three Seller Page' });
});

router.post('/users/FormFourSeller', (req, res) => {
    res.json({ message: 'Form Four Seller Page' });
});
router.get('/selling-login', async (req, res) => {
    res.json({ message: 'Selling Login Page' });
});

router.get('/start-selling', (req, res) => {
    // fs.readFile('seller.json', 'utf8', (err, data) => {
    //     if (err) {
    //         console.error('Error reading file', err);
    //         return res.status(500).send('Internal Server Error');
    //     }

    //     const formData = JSON.parse(data);
    //     const username = req.user ? req.user.name : '';
    // });
    res.json({ message: 'Start Selling Page' });
});
router.post('/api/saveProductData', async (req, res) => {
    const data = req.body;

    try {
        // ตรวจสอบว่าข้อมูลมี id หรือไม่ ถ้ามีให้ทำการอัปเดต ถ้าไม่มีก็ให้สร้างข้อมูลใหม่
        if (data.id) {
            // Update existing entry
            await Selling.update(data, {
                where: { id: data.id }
            });
        } else {
            // Create new entry
            await Selling.create(data);
        }

        console.log('Data saved successfully');
        res.json({ message: 'Data saved successfully' });
    } catch (err) {
        console.error('Error saving data to PostgreSQL', err);
        res.status(500).json({ error: 'Failed to save data' });
    }
});
module.exports = router;