

exports.isRestaurant = (req,res,next) =>{
    try{
        if(req.user.role != "restaurant"){
            return res.status(403).json({
                success:false,
                message:"This route is only for Restaurants",
            });
        }
        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Restaurant role check failed",
        });
    }
}


exports.isNGO = (req,res,next) =>{
    try{
        if(req.user.role != "ngo"){
            return res.status(403).json({
                success:false,
                message:"This route is only for NGOs",
            });
        }
        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"NGO role check failed",
        });
    }
}