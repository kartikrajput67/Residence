const dns = require("node:dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

if(process.env.NODE_ENV != "production"){
    require('dotenv').config()
    // console.log(process.env.CLOUD_API_KEY);
}


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const path = require("path");
const ExpressError = require("./utils/ExpressError.js");

const listingRoute = require("./routes/listing.js");
const reviewRoute = require("./routes/review.js");
const userRoute = require("./routes/user.js");

const cookieParser = require("cookie-parser");
const session = require("express-session");
const {MongoStore} = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./Models/user.js");

// EJS + ejs-mate
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
 
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));   
app.use(cookieParser("secret"));

// MongoDB connection
const dbUrl = process.env.ATLASDB_URL;
mongoose.connect(dbUrl)
    .then(() => { 
        console.log("MongoDB Connected!");
    }) 
    .catch((err) => { 
        console.log("MongoDB connection error:", err); 
    }); 


//mongo session
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error", () => {
    console.log("error on MONGO SESSION STORE", err);
});

app.use(session({
    store: store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{ 
    console.log("Current User:", req.user);
    res.locals.success = req.flash("success"); 
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;//user, who logged in, info in array format else empty[]
    next();
})


// Root route 
// app.get("/", (req, res) => {
//     res.send("I am root");
// });  


app.use("/listings", listingRoute);
app.use("/listings/:id/reviews", reviewRoute);
app.use("/", userRoute); 

app.get("/.well-known/appspecific/com.chrome.devtools.json", (req, res) => {
    res.status(204).end();
});

app.all("/{*splat}", (req, res, next) => {
    console.log("404 REQUEST:", req.method, req.originalUrl);
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