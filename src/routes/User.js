const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User, location } = require('../configs/database');
const nodemailer = require('nodemailer');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
const {sendOtp} = require('./forgotPassword');

router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Error fetching users');
    }
});
router.post('/address', async (req, res) => {
    const { name, district, postalCode, province, address, email } = req.body;
    try {
        const newUser = await location.create({
            name,
            district,
            postalCode,
            province,
            address,
            email
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).send('Error during registration');
    }
});
router.get('/address', async (req, res) => {
    const { email } = req.query; // รับ email จาก query string

    try {
        const userAddress = await location.findOne({ email });
        if (!userAddress) {
            return res.status(404).json({ message: 'Address not found' });
        }
        res.status(200).json(userAddress);
    } catch (error) {
        console.error('Error retrieving address:', error);
        res.status(500).json({ message: 'Failed to retrieve address' });
    }
});

router.put('/address', async (req, res) => {
    const { email, name, district, postalCode, province, address } = req.body;

    try {
        const userAddress = await location.findOne({ email });
        if (!userAddress) {
            return res.status(404).json({ message: 'Address not found' });
        }

        // อัปเดตฟิลด์ที่มีการเปลี่ยนแปลง
        userAddress.name = name;
        userAddress.district = district;
        userAddress.postalCode = postalCode;
        userAddress.province = province;
        userAddress.address = address;

        await userAddress.save();
        res.status(200).json(userAddress);
    } catch (error) {
        console.error('Error during address update:', error);
        res.status(500).send('Error during address update');
    }
});
router.post('/register', async (req, res) => {
    const { name, email, password, ConfirmPassword, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            ConfirmPassword,
            role
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).send('Error during registration');
    }
});
router.put('/updatepassword', async (req, res) => {
    const { email, password, confirmPassword } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        const hashedPassword = await bcrypt.hash(password, 10);
        const hashedconfirmPassword = await bcrypt.hash(confirmPassword, 10);
        user.password = hashedPassword;
        user.ConfirmPassword = hashedconfirmPassword;
        await user.save();
        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).send('Error updating password');
    }
});
router.put('/account', async (req, res) => {
    const { email, name, gender, date, image } = req.body;

    try {
        // กำหนดอีเมลล์ที่ต้องการอัปเดต
        // const email = "S@gmail.com";
        const user = await User.findOne({ email });
        if (!user) {
            console.error('User not found with email:', email);
            return res.status(404).send('User not found');
        }

        // อัปเดตเฉพาะฟิลด์ที่มีการเปลี่ยนแปลง
        user.gender = gender;
        user.date = date;
        user.image = image;
        user.name = name;

        // บันทึกการเปลี่ยนแปลง
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        console.error('Error during update:', error);
        res.status(500).send('Error during update');
    }
});

router.post('/updateRoleToSeller', async (req, res) => {
    const { email } = req.body;

    try {
        // ค้นหาผู้ใช้ตาม email
        const user = await User.findOne({ where: { email } });

        // ตรวจสอบว่าผู้ใช้มีอยู่จริงหรือไม่
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // อัปเดตบทบาทผู้ใช้เป็น seller
        user.role = 'seller';
        await user.save();

        res.status(200).json({ message: 'User role updated to seller successfully', user });
    } catch (error) {
        console.error('Error updating user role:', error);
        res.status(500).send('Error updating user role');
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'savevever1@gmail.com',
                pass: 'bhdp jvok kvzv uqoz'
            }
        });
        const mailOptions = {
            from: 'savevever1@gmail.com',
            to: email,
            subject: 'Login Notification',
            text: 'You have successfully logged in!'
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log('Error sending email:', error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        return res.status(200).json({ message: 'Login successful', user, token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).send('Error logging in user');
    }
});

router.post('/forgotpassword', async (req, res) => {
    const { email, otp } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }
    try {
        if (otp) {
            if (email !== req.session.email) {
                return res.status(400).json({ message: 'Invalid email' });
            }
            if (otp !== req.session.otp) {
                return res.status(400).json({ message: 'Invalid OTP' });
            }
            req.session.otp = null;
            req.session.email = null;
            return res.status(200).json({ message: 'OTP verified successfully' });

        } else {
            const forgotPassword = await sendOtp(email);    
            req.session.otp = forgotPassword.otp;
            req.session.email = email;

            return res.status(200).json({ message: 'OTP sent successfully' });
        }

    } catch (error) {
        console.error('Error handling forgot password:', error);
        res.status(500).send('Error handling forgot password');
    }
});

module.exports = router;
