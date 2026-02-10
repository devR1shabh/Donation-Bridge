const mongoose = require("mongoose");

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{
        console.log("database connected successfully");
    })
    .catch((error) =>{
        console.error(error.message);
        console.log("error in database connection");
        process.exit(1);
    })
}

module.exports = dbConnect;

