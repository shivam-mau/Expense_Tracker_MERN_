require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path =require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods:  ["GET","POST","PUT","DELETE"],
        allowedHeaders:["Content-Type","Authorization"]
    })
);



connectDB();

app.use("/api/v1/auth", authRoutes);
 
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));