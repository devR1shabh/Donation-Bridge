const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt  = require("bcrypt");

require("dotenv").config();

exports.signup = async (req,res) =>{
    try{
        const {name,email,password,role} = req.body;

        if(!name || !email || !password || !role){
            return res.status(400).json({
                success:false,
                message:"Please fill in all the fields",
            });
        }

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(409).json({
                success:false,
                message:"User Already exists",
            });
        }

        const SALT_ROUNDS = 10;
        const hashedPassword = await bcrypt.hash(password,SALT_ROUNDS);

        const user = await User.create({
            name,
            email,
            password:hashedPassword,
            role,
        });

        return res.status(201).json({
            success:true,
            message:"User Registered Successfully",
        });

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"signup failed",
        });
    }
}

exports.login = async (req,res) =>{
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"ALL fields are required",
            });
        }

        const user = await User.findOne({email}) ;
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Invalid Credentials",
            });
        }

        const isMatch = await bcrypt.compare(password , user.password);

        if(!isMatch){
            return res.status(401).json({
                success:false,
                message:"Invalid Credentials",
            });
        }

        const payload = {
            role:user.role,
            _id:user._id.toString(),
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET , {
            expiresIn:"4h",
        });

        return res.status(200).json({
            success:true,
            token,
        });


    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Sorry login failed",
        });
    }
}