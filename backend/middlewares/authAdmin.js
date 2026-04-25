import jwt from 'jsonwebtoken';

const authAdmin = async (req, res, next) => {
    try {
        const { adminToken } = req.cookies;

        if (!adminToken) {
            return res.status(401).json({ success: false, message: "Unauthorized: No admin token" });
        }

        const tokenDecoded = jwt.verify(adminToken, process.env.JWT_SECRET);

        if (tokenDecoded && tokenDecoded.email === process.env.ADMIN_EMAIL) {
            return next();
        } else {
            return res.status(401).json({ success: false, message: "Unauthorized: Invalid admin credentials" });
        }
    } catch (error) {
        return res.status(401).json({ success: false, message: "Unauthorized: Invalid or expired token" });
    }
};

export default authAdmin;