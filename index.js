

require("dotenv").config();
const PORT = process.env.PORT || 3000;


const app = require("./src/app");
const dbConnect = require("./src/config/database")

dbConnect();



app.listen(PORT, () =>{
    console.log(`successfully started at port ${PORT}`);
})