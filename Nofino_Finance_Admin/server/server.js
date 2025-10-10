require('dotenv').config()
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const connectDb = require("./utils/db");
const errorMiddleware = require('./middlewares/error-middlewar');

// lst's import admin router
const adminRoute = require("./router/Admin-router");

app.use(express.json());
app.use(cors());
const corsOptions = {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD'],
    credentials: true,
    optionsSuccessStatus: 200 
}

//lest's usere cors options
app.use(cors(corsOptions));

//lset's use routes
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);


// lst's import admin router
app.use("/api/admin", adminRoute);

app.use(errorMiddleware);

// const PORT = 5000;
connectDb().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is runing at port: ${process.env.PORT}`);
    });
});

