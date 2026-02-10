const express = require("express");
const router = express.Router();

const {createDonation,getAvailableDonations,claimDonations,collectDonation} = require("../controllers/donationController");
const {auth} = require("../middleware/authMiddleware");
const {isRestaurant} = require("../middleware/roleMiddleware");
const {isNGO} = require("../middleware/roleMiddleware");

router.post("/create" , auth, isRestaurant, createDonation );
router.get("/available", auth , isNGO , getAvailableDonations);
router.post("/:id/claim", auth, isNGO, claimDonations)
router.patch("/:id/collect", auth ,isRestaurant ,collectDonation);

module.exports = router;