const express = require("express");
const router = express.Router();

const {createDonation,getAvailableDonations,claimDonations,collectDonation,getMyDonations, getClaimedDonations} = require("../controllers/donationController");
const {auth} = require("../middleware/authMiddleware");
const {isRestaurant} = require("../middleware/roleMiddleware");
const {isNGO} = require("../middleware/roleMiddleware");

/**
 * @swagger
 * /api/v1/donation/create:
 *   post:
 *     summary: Create a donation
 *     tags: [Donation]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - foodName
 *               - quantity
 *               - location
 *               - pickupBy
 *             properties:
 *               foodName:
 *                 type: string
 *                 example: Cooked Rice
 *               quantity:
 *                 type: string
 *                 example: 20 plates
 *               location:
 *                 type: string
 *                 example: Sector 18, Noida
 *               pickupBy:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-04-05T20:31:58.857Z
 *     responses:
 *       201:
 *         description: Donation created successfully
 *       401:
 *         description: Unauthorized
 */

router.post("/create" , auth, isRestaurant, createDonation );
router.get("/my-donations" , auth , isRestaurant , getMyDonations);
router.get("/claimed", auth , isNGO , getClaimedDonations);

/**
 * @swagger
 * /api/v1/donation/available:
 *   get:
 *     summary: Get available donations
 *     tags: [Donation]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of available donations
 *       401:
 *         description: Unauthorized
 */
router.get("/available", auth , isNGO , getAvailableDonations);


/**
 * @swagger
 * /api/v1/donation/{id}/claim:
 *   post:
 *     summary: Claim a donation
 *     tags: [Donation]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Donation ID
 *     responses:
 *       200:
 *         description: Donation claimed successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/:id/claim", auth, isNGO, claimDonations)

/**
 * @swagger
 * /api/v1/donation/{id}/collect:
 *   patch:
 *     summary: Mark donation as collected
 *     tags: [Donation]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Donation ID
 *     responses:
 *       200:
 *         description: Donation marked as collected
 *       401:
 *         description: Unauthorized
 */

router.patch("/:id/collect", auth ,isRestaurant ,collectDonation);

module.exports = router;