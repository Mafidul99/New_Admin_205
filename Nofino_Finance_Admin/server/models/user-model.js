const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    phone: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    profileImgUrl:{
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/219/219983.png",
    },
    role: {
        type: String,
        enum: [
            "admin", "user"
        ],
        default: "user",
    }
},
{timestamps: true}
);

userSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified("password")) {
        next();
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;

    } catch (error) {
        next(error);
    }
});


// comparePassword
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// jwtweb tokon
userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
                userId: this._id.toString(),
                email: this.email,
                role: this.role,
            },
            process.env.JWT_SECRET_KEY, 
            {
                expiresIn: "1d",
            }
        );
    } catch (error) {
        console.error(error);

    }
};

const User = new mongoose.model("User", userSchema);
module.exports = User;