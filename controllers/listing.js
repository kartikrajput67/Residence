const listing = require("../Models/listings.js");
const Review = require("../Models/review.js");
const ExpressError = require("../utils/ExpressError.js");
const {cloudinary} = require("../cloudConfig.js");

//mapbox api for geocoding
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({
    accessToken: mapToken
});

module.exports.index = async (req, res) => {
    const allListings = await listing.find();
    res.render("listings/index.ejs", { allListings });
}

module.exports.newListing = async(req, res) => {
    res.render("listings/newListingForm.ejs");
}

module.exports.createListing = async (req, res) => {
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
    }).send();
    if (!response.body.features.length) { 
        throw new ExpressError(400, "Invalid location. Please enter a valid address.");
    }

    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new listing(req.body.listing);
    newListing.owner = req.user._id;
    // newListing.image.url = url;
    // newListing.image.filename = filename;
    newListing.image = {url, filename};
    newListing.geometry = response.body.features[0].geometry;
    let savedListing = await newListing.save();
    // console.log(savedListing);
    req.flash("success", "New Listing created!");
    res.redirect("/listings");
}

module.exports.editListingForm = async (req, res) => {
    const { id } = req.params;
    const editListing = await listing.findById(id);
    if(!editListing){
        req.flash("error", "The requested listing does not exist.");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { editListing });
}

module.exports.showListing = async (req, res) => {
    const { id } = req.params;
    const singlelisting = await listing.findById(id).populate({path: "reviews", populate: {path: "owner"}}).populate("owner");
    if (!singlelisting) {
        req.flash("error", "The requested listing does not exist.");
        return res.redirect("/listings");
    }
    // console.log(singlelisting);
    res.render("listings/show.ejs", { singlelisting });
}

module.exports.updateListing = async (req, res) => {
    const { id } = req.params;

    const listingToUpdate = await listing.findById(id);

    if (!listingToUpdate) {
        throw new ExpressError(404, "Listing not found");
    }

    // Update other listing details
    Object.assign(listingToUpdate, req.body.listing);

    // Get updated location coordinates
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
    }).send();

    if (!response.body.features.length) {
        throw new ExpressError(400, "Invalid location. Please enter a valid address.");
    }

    listingToUpdate.geometry = response.body.features[0].geometry;

    // Keep track of the old image
    let oldImage = listingToUpdate.image?.filename;

    // Replace image only if a new one was uploaded
    if (req.file) {
        listingToUpdate.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }

    await listingToUpdate.save();

    // Delete old image after successful database update
    if (req.file && oldImage) {
        await cloudinary.uploader.destroy(oldImage);
    }

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
    const { id } = req.params;

    const listingToDelete = await listing.findById(id);

    if (!listingToDelete) {
        throw new ExpressError(404, "Listing not found");
    }

    // Delete image from Cloudinary
    if (listingToDelete.image?.filename) {
        await cloudinary.uploader.destroy(
            listingToDelete.image.filename
        );
    }

    // Delete associated reviews
    await Review.deleteMany({
        _id: { $in: listingToDelete.reviews }
    });

    // Delete listing from MongoDB
    await listingToDelete.deleteOne();

    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};