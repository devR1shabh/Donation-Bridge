const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req,res,next) =>{
    try{
        
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            return res.status(401).json({
                success:false,
                message:"token missing or invalid"
            });
        }
        
        const token = authHeader.split(" ")[1];
        
        if(!token || token == undefined){
            return res.status(401).json({
            success:false,
            message:"token missing or invalid"
        });
    }
    
    const payload = jwt.verify(token , process.env.JWT_SECRET);
    req.user = {
        _id:payload._id,
        role:payload.role,
    };

    next();

    }catch(error){
        return res.status(401).json({
            success:false,
            message:"Unauthorized"
        });
    }
}
