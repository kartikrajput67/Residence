const Listing = require("./Models/listings.js");
const Review = require("./Models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        // console.log(req);
        // console.log("Saved URL:", req.originalUrl);
        req.session.redirectUrl = req.originalUrl;
        // console.log(req.session.redirectUrl);
        req.flash("error", "Please login first to do these tasks");
        return res.redirect("/login");
    } 
    next();
}

module.exports.saveRedirectUrl = (req,res, next)=>{
    // console.log("Session URL:", req.session.redirectUrl);
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async(req, res, next)=>{
    const { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","You are not the owner to do these task.");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isReviewOwner = async(req, res, next)=>{
    const { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if(!review.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","You are not the owner to do these task.");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateSchema = (req,res,next)=>{
    // console.log(req.body.listing);
    const {error} = listingSchema.validate(req.body);
    if(error) throw new ExpressError(404, error);
    next();
}

module.exports.validateReview = (req,res,next)=>{
    const {error} = reviewSchema.validate(req.body);
    if(error) throw new ExpressError(404, error);
    next();
}