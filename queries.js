'use strict';
/* Add all the required libraries*/
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config.js'),
    listingData;

var listingSchema = new Schema({
  /* Your code for a schema here */ 
  //Check out - https://mongoosejs.com/docs/guide.html
    code:  {type: String, required: true},
    name: {type: String,  required: true},
    coordinates: [{ latitude: Number, longitude: Number }],    
    address: String,   
});

/* Connect to your database using mongoose - remember to keep your key secret*/
const uri = config.db.uri;
mongoose.connect(uri, { useNewUrlParser: true });
  const MongoClient = require('mongodb').MongoClient;
  const client = new MongoClient(uri, { useNewUrlParser: true });

/* Fill out these functions using Mongoose queries*/
//Check out - https://mongoosejs.com/docs/queries.html

var findLibraryWest = function() {
  /* 
    Find the document that contains data corresponding to Library West,
    then log it to the console. 
   */
   client.connect(err => {
    const collection = client.db("ListingDatabase").collection("Listing");
    // perform actions on the collection object    
    var query = client.db("ListingDatabase").collection("Listing").findOne({
      "name" : "Library West"},(err, item)=>{
      console.log(item);    
    });


   });

};
var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed 
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console. 
   */
   client.connect(err => {
    const collection = client.db("ListingDatabase").collection("Listing");
    // perform actions on the collection object    
    var query = client.db("ListingDatabase").collection("Listing").deleteOne({
      "code" : "CABL"},(err, item)=>{       
    });

   });
};
var updatePhelpsLab = function() {
  /*
    Phelps Lab address is incorrect. Find the listing, update it, and then 
    log the updated document to the console. 
    
    Correct Address: 1953 Museum Rd, Gainesville, FL 32603

   */
   client.connect(err => {
    const collection = client.db("ListingDatabase").collection("Listing");
    // perform actions on the collection object    
    var query = client.db("ListingDatabase").collection("Listing").updateOne({
      "name" : "Phelps Laboratory"},
            {$set: {"address": "1953 Museum Rd, Gainesville, FL 32603"}});




   });
console.log("updated");    
};
var retrieveAllListings = function() {
  /* 
    Retrieve all listings in the database, and log them to the console. 
   */
    client.connect(err => {
    const collection = client.db("ListingDatabase").collection("Listing");
       var query = client.db("ListingDatabase").collection("Listing").find().toArray(function(err, listing) {
            console.log(JSON.stringify(listing, null, 2));
          });
    });

};

findLibraryWest();
removeCable();
updatePhelpsLab();
retrieveAllListings();
