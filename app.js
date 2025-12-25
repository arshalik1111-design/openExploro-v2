const express = require("express");
const app = express();

const mongoose = require("mongoose");
const Listing = require("./models/listing.js"); // we use this to test our lisitng sample

const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
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

app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("./listings/index.ejs", { allListings });
});
//Create route, always above the dhow route otherwise the show route will take the listings/new as the the id passing.
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});
//Show Route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  // As we got the id, we find using the findById
  const listing = await Listing.findById(id);
  // Now create show.ejs where data of each listing is visible

  res.render("listings/show.ejs", { listing });
});

//Index route

//Show Route(Read in CRUD, for that we do: app.use(express.urlencoded(extended:true)) it is used to parse the incoming HTTP request bodies that are URL encoded. It makes the parsed data available as a javascript object on  the req.bpdy property )

// app.get("/testListing", async (req, res) => {
//   const sampleListing = await new Listing({
//     title: "My Villa",
//     description: "Golden hour view",
//     price: 800,
//     location: "Calicut,Goa",
//     country: "India",
//   });
//   await sampleListing.save();
//   console.log("Sample was saved");
//   res.send("saved successfully");
//   //After this too the data will not get saved in the DB untill we run it on localhost

//   // After this we move towards initialization of database
// })
app.get("/", (req, res) => {
  res.send("Working broo working you got you first get request working ");
});

app.listen("3030", () => {
  console.log("connection succesful");
});
