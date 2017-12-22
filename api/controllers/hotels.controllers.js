const mongoose = require('mongoose');
const Hotel = mongoose.model('Hotel');


const runGeoQuery = (req, res) => {

  const lng = parseFloat(req.query.lng);
  const lat = parseFloat(req.query.lat);

  // A geoJSON point
  const point = {
    type : "Point",
    coordinates : [lng, lat]
  };

  const geoOptions = {
    spherical : true,
    maxDistance : 2000,
    num : 5
  };

  Hotel
    .geoNear(point, geoOptions, (err, results, stats) => {
      console.log('Geo Results', results);
      console.log('Geo stats', stats);
      res
        .status(200)
        .json(results);
    });

};

module.exports.hotelsGetAll = (req, res) => {

  console.log('GET the hotels');
  console.log(req.query);

  const offset = 0;
  const count = 5;

  if (req.query && req.query.lat && req.query.lng) {
    runGeoQuery(req, res);
    return;
  }

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }

  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }

  Hotel
    .find()
    .skip(offset)
    .limit(count)
    .exec((err, hotels) => {
      console.log("Found hotels", hotels.length);
      res
        .json(hotels);
    });

};

module.exports.hotelsGetOne = (req, res) => {
  const id = req.params.hotelId;
  console.log('GET hotelId', id);

  Hotel
    .findById(id)
    .exec((err, doc) => {
      res
        .status(200)
        .json(doc);
    });

};

module.exports.hotelsAddOne = (req, res) => {
  console.log("POST new hotel");
  const db = dbconn.get();
  const collection = db.collection('hotels');
  let newHotel;

  if (req.body && req.body.name && req.body.stars) {
    newHotel = req.body;
    newHotel.stars = parseInt(req.body.stars, 10);
    collection.insertOne(newHotel, (err, response) => {
      console.log("Hotel added", response);
      console.log("Hotel added", response.ops);
      res
        .status(201)
        .json(response.ops);
    });
    // console.log(newHotel);
    // res
    //   .status(200)
    //   .json(newHotel);
  } else {
    console.log("Data missing from body");
    res
      .status(400)
      .json({
        message: "Required data missing from body"
      });
  }

};
