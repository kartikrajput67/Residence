const express = require("express");
const router = express.Router();
const { isLoggedIn, isOwner, validateSchema } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage })


router.route("/")
    .get(listingController.index)
    .post(isLoggedIn, upload.single('listing[image][url]'), validateSchema, listingController.createListing);
    // .post(,(req,res)=>{
    //     res.send(req.file);
    // })

// New listing form
router.get("/new", isLoggedIn, listingController.newListing);


// Edit form
router.get("/:id/edit", isLoggedIn, listingController.editListingForm);

router.route("/:id")
    .get(listingController.showListing)
    .put(isLoggedIn, isOwner, upload.single('listing[image][url]'), validateSchema, listingController.updateListing)
    .delete(isLoggedIn, isOwner,  listingController.deleteListing);

module.exports = router;