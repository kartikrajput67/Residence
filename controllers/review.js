const listing = require("../Models/listings");
const Review = require("../Models/review.js");


module.exports.createReview = async(req,res)=>{
    let newReview = new Review(req.body.review);
    let reviewListing = await listing.findById(req.params.id);
    // console.log(newReview);
    newReview.owner = req.user._id;
    reviewListing.reviews.push(newReview._id);
    await newReview.save();
    await reviewListing.save();
    req.flash("success", "New review Created!");
    res.redirect(`/listings/${reviewListing._id}`);
}

module.exports.deleteReview = async(req,res)=>{
    let {id, reviewId} = req.params;
    const review = await Review.findByIdAndDelete(reviewId);
    // console.log(review);
    req.flash("success", "Review Deleted!");
    await listing.findByIdAndUpdate(id, {$pull : {reviews:reviewId}});
    res.redirect(`/listings/${id}`);  
}