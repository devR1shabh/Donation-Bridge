const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
    foodName:{
        type:String,
        required:true,
        trim:true,
    },
    quantity:{
        type:String,
        required:true,
        trim:true,
    },
    pickupBy:{
        type:Date,
        required:true,
    },
    location:{
        type:String,
        required:true,
        trim:true,
    },
    image:{
        type:String
    },
    status:{
        type:String,
        enum:["available", "claimed" , "collected"],
        default:"available",
    },
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    claimedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null,
    },
},
{
    timestamps:true,
}
);

module.exports = mongoose.model("Donation" , donationSchema);