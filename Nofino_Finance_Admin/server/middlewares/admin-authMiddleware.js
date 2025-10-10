

const adminMiddleware = async (req, res, next) => {
    try {
        const adminRole = req.user.isAdmin;
        if (!adminRole) {
            return res.status(403).json({
                message: "Access denied User is not an admin"
            });
        }
        // If the user is an admin, proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Admin middleware error:", error);
         res.status(500).json({
            message: "Internal server error"
        });
        next(error);
    }
};

module.exports = adminMiddleware;
