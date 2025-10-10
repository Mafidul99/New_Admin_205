
const User = require("../models/user-model");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0});
        if (!users || users.length === 0) {
            return res.status(404).json({
                message: "No users found"
            });
        }
        return res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching users",
            error: error.message
        });
        next(error);
    }
};


const getAllContacts = async (req, res) => {
    try {
        const users = await User.find({ isContact: true }, { password: 0 });
        if (!users || users.length === 0) {
            return res.status(404).json({
                message: "No users found"
            });
        }
        return res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching users",
            error: error.message
        });
        next(error);
    }
};

module.exports = {getAllUsers, getAllContacts};
