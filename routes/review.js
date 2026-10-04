const express = require("express");
const router = express.Router({ mergeParams: true });
const {reviewSchema} = require("../schema.js");
const Review = require("../Models/review.js");
const listing = require("../Models/listings.js");
const ExpressError = require("../utils/ExpressError.js");

const validateReview = (req,res,next)=>{
    const {error} = reviewSchema.validate(req.body);
    if(error) throw new ExpressError(404, error);
    next();
}

//create reviews
router.post("/", validateReview, async(req,res)=>{
    let newReview = new Review(req.body.review);
    let reviewListing = await listing.findById(req.params.id);
    // console.log(newReview);
    reviewListing.reviews.push(newReview._id);
    await newReview.save();
    await reviewListing.save();
    res.redirect(`/listings/${reviewListing._id}`);
})

//delete reviews
router.delete("/:reviewId", async(req,res)=>{
    let {id, reviewId} = req.params;
    const review = await Review.findByIdAndDelete(reviewId);
    console.log(review);

    await listing.findByIdAndUpdate(id, {$pull : {reviews:reviewId}});
    res.redirect(`/listings/${id}`);  
})


module.exports = router;