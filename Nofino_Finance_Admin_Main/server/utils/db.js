const mongoose = require("mongoose");


// const URI = "mongodb://127.0.0.1:27017/nofino_admin"
// mongoose.connect(URI)

const URI = process.env.SERVER_MONGODB_URI

const connectDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Connection Successful to Database Ok");
        
    } catch (error) {
        console.error("Database Conn Failed !..");
        process.exit(0);
    }
};

module.exports = connectDb;