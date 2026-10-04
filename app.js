const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const path = require("path");
const ExpressError = require("./utils/ExpressError.js");
const listingRoute = require("./routes/listing.js");
const reviewRoute = require("./routes/review.js");

// EJS + ejs-mate
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
 
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));   

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/residence")
    .then(() => {
        console.log("MongoDB Connected!");
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err);
    });

// Root route
app.get("/", (req, res) => {
    res.send("I am root");
});

app.use("/listings", listingRoute);
app.use("/listings/:id/reviews", reviewRoute);

app.all("/{*splat}", (req, res, next) => {
    const err = new ExpressError(404, "Page not found!");
    next(err);
})
// Error handler
app.use((err, req, res, next) => {
    console.log(err);
    const { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error.ejs",{message});
    // res.status(status).send(message);
});

// Start server
app.listen(8080, () => {
    console.log("App is listening at port 8080.");
});