const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
main()
  .then(() => {
    console.log("connection succesful to DB");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  Listing.deleteMany({});
  Listing.insertMany(initData.data);
  console.log("Data was saved");
};
initDB();

// After initialization of DB we go to our first route i.e. Index route GET /listings
// All the upcoming APIs will too be forwarded to /listings
