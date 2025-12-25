const express = require("express");
const app = express();
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const Listing = require("./models/listing.js"); // we use this to test our lisitng sample

const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
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

//Index route

app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("./listings/index.ejs", { allListings });
});
//Create route, always above the show route otherwise the show route will take the listings/new as the the id passing.
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

//New list insertion Route
app.post("/listings", async (req, res) => {
  // let { title, description, image, price, location, country } = req.body;
  // we have two ways either the upper one or the easy one, i.e. by making variables the key of the object Lisitng then we can do the below
  let newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
});

//Edit route
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});

// Update Route
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  // let listing = req.body;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  res.redirect(`/listings/${id}`);
})

// Delete Route

app.delete("/listings/:id", async (req, res) => {
  const { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings")

});

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
  console.log("Listening to port 3030");
});
