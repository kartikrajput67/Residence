const mongoose = require("mongoose");
const { type } = require("../schema");
const Schema = mongoose.Schema;
const Review = require("./review");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    image: {
        filename: String,
        url: {
            type: String,
            default: "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?fm%3Djpg%26q%3D60%26w%3D3000%26auto%3Dformat%26fit%3Dcrop%26ixlib%3Drb-4.1.0%26ixid%3DM3wxMjA3fDB8MHxzZWFyY2h8OHx8YSUyMHJvb218ZW58MHx8MHx8fDA%253D&tbnid=2DhUP9-Z7FO-zM&vet=1&imgrefurl=https://unsplash.com/s/photos/a-room&docid=DTN8Y-kVZLP99M&w=3000&h=1688&source=sh/x/im/m1/1&kgs=0cabce8040d57155&shem=epsd1,rimspwouoe&utm_source=epsd1,rimspwouoe,sh/x/im/m1/1",
            set: (v) => {
                return v === ""
                    ? "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?fm%3Djpg%26q%3D60%26w%3D3000%26auto%3Dformat%26fit%3Dcrop%26ixlib%3Drb-4.1.0%26ixid%3DM3wxMjA3fDB8MHxzZWFyY2h8OHx8YSUyMHJvb218ZW58MHx8MHx8fDA%253D&tbnid=2DhUP9-Z7FO-zM&vet=1&imgrefurl=https://unsplash.com/s/photos/a-room&docid=DTN8Y-kVZLP99M&w=3000&h=1688&source=sh/x/im/m1/1&kgs=0cabce8040d57155&shem=epsd1,rimspwouoe&utm_source=epsd1,rimspwouoe,sh/x/im/m1/1"
                    : v
            },
        }

    },
    price: Number,
    location: String,
    country: String,

    reviews: [
        {
            type: Schema.Types.ObjectId,
             ref: 'Review'
        }
    ]
})

const listings = mongoose.model("listings", listingSchema);
module.exports = listings;