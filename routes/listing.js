const express = require("express");
const router = express.Router();
const {listingSchema} = require("../schema.js");
const listing = require("../Models/listings.js");
const ExpressError = require("../utils/ExpressError.js");

const validateSchema = (req,res,next)=>{
    console.log(req.body.listing);
    const {error} = listingSchema.validate(req.body);
    // console.log(result.error);
    if(error) throw new ExpressError(404, error);
    next();
}

// Index router
router.get("/", async (req, res) => {
    const allListings = await listing.find();
    res.render("listings/index.ejs", { allListings });
});

// New listing form
router.get("/new", (req, res) => {
    res.render("listings/newListingForm.ejs");
});

// Create listing
router.post("/", validateSchema, async (req, res) => {
    const newListing = new listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});

// Edit form
router.get("/:id/edit", async (req, res) => {
    const { id } = req.params;
    const editListing = await listing.findById(id);
    res.render("listings/edit.ejs", { editListing });
});

// Show listing
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const singlelisting = await listing.findById(id).populate("reviews");
    if (!singlelisting) {
        return res.status(404).send("Listing not found");
    }
    res.render("listings/show.ejs", { singlelisting });
});

// Update listing
router.put("/:id", validateSchema, async (req, res) => {
    const { id } = req.params;
    await listing.findByIdAndUpdate(id, {
        ...req.body.listing
    });
    res.redirect(`/listings/${id}`);
});

// Delete listing
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const listingToDelete = await listing.findByIdAndDelete(id);
    if (!listingToDelete) {
        throw new ExpressError(404, "Listing not found");
    }

    await Review.deleteMany({
        _id: { $in: listingToDelete.reviews }
    });
    console.log(listingToDelete);
    res.redirect("/listings");
});

module.exports = router;