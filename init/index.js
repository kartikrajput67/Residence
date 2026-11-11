const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../Models/listings.js");
const { init } = require("../Models/user.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/residence";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj, owner: '6adb3cbfb4414d6f24c61dfd',
  }))
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();