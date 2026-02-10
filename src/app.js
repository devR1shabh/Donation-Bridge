const express = require("express");
const app = express();

const authRoutes = require("./routes/authRoutes");
const donationRoutes = require("./routes/donationRoutes")

const {errorHandler} = require("./middleware/errorMiddleware"); 

app.use(express.json());


app.get("/testing" , (req,res) =>{
    return res.status(200).json({
        success:true,
        message:"Donationbridge API is running",
    });
});

app.use("/api/v1/auth" , authRoutes);
app.use("/api/v1/donation" , donationRoutes);

app.use(errorHandler);

module.exports = app;