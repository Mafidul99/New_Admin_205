const User = require("../models/user-model");
// const bcrypt = require("bcryptjs");

const home = async (req, res) => {
    try {
        res.status(200).send('Welcome to Server Start Router');

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "page Not Found!"
        });

    }
};

const register = async (req, res) => {
    try {
        const {
            username,
            email,
            phone,
            password,
            profileImgUrl,
            role
        } = req.body;

        if(!username || !email || !phone || !password || username === "" || email === "" || password == ""){            
             return res.status(400).json({
                message: "All fields are required "
            });
        };

        const userExist = await User.findOne({
            email
        });

        if (userExist) {
            return res.status(400).json({
                message: "Email alredy Exists !..."
            })
        }

        const userExistPhone = await User.findOne({
            phone
        });

        if (userExistPhone) {
             return res.status(400).json({
                message: "Phone alredy Exists !..."
            })
        }

        // hash password
        // const saltRound = 10;
        // const hash_password = await bcrypt.hash(password, saltRound);

        const userCreated = await User.create({
            username,
            email,
            phone,
            password,
            profileImgUrl,
            role
        });

        res.status(201).json({
            message: "Registration Successfully Done..",
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(),
        });
    } catch (error) {
        res.status(500).json("Internal Server Error !..");
    }
};


// user LoginMenu
const login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        if(!email || !password || email === "" || password == ""){            
             return res.status(400).json({
                message: "All fields are required "
            });
        };

        const userExist = await User.findOne({
            email
        });

        if (!userExist) {
            return res.status(400).json({
                message: "Invalid Credentials..."
            });
        }

        // const user = await bcrypt.compare(password, userExist.password);
        const user = await userExist.comparePassword(password);

        if (user) {
            res.status(200).json({
                message: "Login Successfully Done..",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
                role: userExist.role,
            });
        }else{
            res.status(401).json({msg: "Invalid Email or Password.."})
        }

    } catch (error) {
        // res.status(500).json("Internal Server Error !..");
        next(error);
    }
}



// user logic
const user = async (req, res) => {
    try {
        const userData = req.user;
        // console.log(userData);
        return res.status(200).json({userData});
                
    } catch (error) {
        console.log(`error from the  user route ${error}`);
        return res.status(500).json({message: "Internal Server Error"});
    }
};

module.exports = {
    home,
    register,
    login,
    user
};