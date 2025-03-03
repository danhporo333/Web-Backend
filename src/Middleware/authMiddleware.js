const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Không có token!" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token không hợp lệ!" });
    }
}

const checkRole = (roles) => {
    return async (req, res, next) => {
        try {
            const userRoles = await db.UserRole.findAll({
                where: { userId: req.user.userId },
                include: [{ model: db.Role }]
            });

            const userRoleNames = userRoles.map(userRole => userRole.Role.name);

            const hasRole = roles.some(role => userRoleNames.includes(role));
            if (!hasRole) {
                return res.status(403).json({ message: "Không có quyền truy cập!" });
            }

            next();
        } catch (error) {
            console.error("Error checking role:", error);
            return res.status(500).json({ message: "Lỗi máy chủ!" });
        }
    };
};

module.exports = { verifyToken, checkRole };