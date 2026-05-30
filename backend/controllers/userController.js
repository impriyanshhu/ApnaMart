import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import transporter from "../config/nodemailer.js";

// Register User : /api/user/register
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true, // to prevent js to access the cookie
            secure: process.env.NODE_ENV === 'production', // to secure the cookie in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // to prevent CSRF attacks
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days cookie expiration
        })

        return res.json({ success: true, user: { email: user.email, name: user.name }, message: "User registered successfully" });

    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}


// Login User : /api/user/login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: false, message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.json({ success: true, user: { id: user._id, email: user.email, name: user.name }, message: "User logged in successfully" });

    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

//  check auth user : /api/user/is-auth
export const isAuth = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId).select('-password');

        return res.json({ success: true, user: user });

    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

//  logout user : /api/user/logout
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        return res.json({ success: true, message: "User logged out successfully" });
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

// Send Reset OTP : /api/user/send-reset-otp
export const sendResetOtp = async (req, res) => {

    try {

        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const user = await User.findOne({
            email: email.toLowerCase().trim()
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        // Generate 6 digit OTP
        const otp = String(
            Math.floor(100000 + Math.random() * 900000)
        );

        // Save OTP
        user.resetOtp = otp;

        // 15 min expiry
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;

        await user.save();
        // Send Mail
        const mailOptions = {
            from: process.env.SENDER_EMAIL,

            to: user.email,

            subject: "Password Reset OTP",

            html: `
                <h2>Password Reset OTP</h2>

                <p>Your OTP is:</p>

                <h1>${otp}</h1>

                <p>This OTP will expire in 15 minutes.</p>
            `
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully"
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Reset Password : /api/user/reset-password
export const resetPassword = async (req, res) => {
    try {
        const { email, otp, password } = req.body;

        if (!email || !otp || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await User.findOne({
            email: email.toLowerCase().trim()
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Check OTP
        if (user.resetOtp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        // Check Expiry
        if (user.resetOtpExpireAt < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "OTP expired"
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update password
        user.password = hashedPassword;

        // Clear OTP
        user.resetOtp = "";
        user.resetOtpExpiryAt = 0;

        await user.save();
        return res.status(200).json({
            success: true,
            message: "Password reset successful"
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};