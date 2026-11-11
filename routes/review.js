const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../Models/review.js");
const listing = require("../Models/listings.js");
const {isLoggedIn, validateReview, isReviewOwner} = require("../middleware.js");
const reviewController = require("../controllers/review.js");

//create reviews
router.post("/",isLoggedIn, validateReview, reviewController.createReview);

//delete reviews
router.delete("/:reviewId", isLoggedIn, isReviewOwner, reviewController.deleteReview);


module.exports = router;