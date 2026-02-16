const Donation = require("../models/Donation");

exports.createDonation = async (req,res) =>{
    try{

        const {foodName,quantity,pickupBy,location} = req.body;

        if(!foodName || !quantity || !pickupBy || !location){
            return res.status(400).json({
                success:false,
                message:"all fields are required",
            });
        }

        console.log("REQ USER- ",req.user)

        const donation = await Donation.create({
            foodName,
            quantity,
            pickupBy,
            location,
            postedBy: req.user._id
        })

        return res.status(201).json({
            success:true,
            message:"Donation Created successfully",
            donation,
        });

    }catch(error){
        console.error("create donation error- ",error);
        return res.status(500).json({
            success:false,
            message:"Failed to Create Donation",
            error:error.message,
        });
    }
}

exports.getAvailableDonations = async (req,res) =>{
    try{
        const donations = await Donation.find({
            status:"available",
            pickupBy:{$gt : new Date()},
        });

        return res.status(200).json({
            success:true,
            donations,
        });

    }catch(error){
        console.error("error- ", error)
        return res.status(500).json({
           success:false,
           message:"failed to fetch donations",
           error:error.message, 
        });
    }
}


exports.claimDonations = async (req,res) => {
    try{
        const donationId = req.params.id;

        const donation = await Donation.findById(donationId);

        if(!donation){
            return res.status(404).json({
                success:false,
                message:"Donation Not found",
            });
        }

        if(donation.status !== "available"){
            return res.status(400).json({
                success:false,
                message:"Donation already claimed",
            });
        }

        donation.status = "claimed";
        donation.claimedBy = req.user._id;

        await donation.save();

        return res.status(200).json({
            success:true,
            message:"donation claimed successfully",
            donation,
        });

    }catch(error){
        console.log("Error- ",error);
        return res.status(500).json({
            success:false,
            message:"Failed to claim donation",
            error: error.message,

        });

    }
};


exports.collectDonation = async (req,res) =>{
    try{
        const donationId  = req.params.id;

        const donation = await Donation.findById(donationId);
        if(!donation){
            return res.status(404).json({
                success:false,
                message:"donation not found",
            });
        };

        if(donation.postedBy.toString()!== req.user._id.toString()){
            return res.status(403).json({
                success:false,
                message:"Not authorized to collect this donation",
            });
        }

        if(donation.status !== "claimed"){
            return res.status(400).json({
                success:false,
                message:"Donation must be claimed first",
            });
        }

        donation.status = "collected";
        await donation.save();

        return res.status(200).json({
            success:true,
            message:"Donation collected successfully",
            donation,
        });
        
    }catch(error){
        return res.status(500).json({
            success:FileSystemWritableFileStream,
            message:"failed to collect donation",
            error: error.message,
        });
    }
}