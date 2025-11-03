const Contact = require("../models/contact-model");
const User = require("../models/user-model");


// Allusers getData
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, {
            password: 0
        });
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

// Allusers Contacts getData
const getAllContacts = async (req, res) => {
    try {        
        const contacts = await Contact.find();
        if (!contacts || contacts.length === 0) {
            return res.status(404).json({
                message: "No message  Data"
            });
        }
        return res.status(200).json(contacts);
    } catch (error) {        
        next(error);
    }
};



// getUserById Edit
const getUserById = async (req, res) =>{
    try {
        const id = req.params.id;
        const data = await User.findOne({_id: id}, {password: 0});
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

// Updarte us user
const updateUserById = async (req, res) => {
    try {
    
        const id = req.params.id;
        const updateUserData = req.body;

        const updatedData = await User.updateOne({_id: id}, {
            $set: updateUserData,
        });

        return res.status(200).json(updatedData);
    } catch (error) {
        next(error);
    }
};



// deleteUserById user
const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        await User.deleteOne({
            _id: id
        });

        return res.status(200).json({
            message:"User Deleted Successfully.."
        });
    } catch (error) {
        next(error);
    }
};


// / deleteContactById user
const deleteContactById = async (req, res) => {
    try {
        const id = req.params.id;
        await Contact.deleteOne({
            _id: id
        });

        return res.status(200).json({
            message:"Contact Message Deleted Done.."
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllUsers,    
    deleteUserById,
    getUserById,
    updateUserById,
    getAllContacts,
    deleteContactById
};