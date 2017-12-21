'use strict';

const dbconn = require('../data/dbconnection.js');
const hotelData = require('../data/hotel-data.json');

module.exports.hotelsGetAll = (req, res) => {

  const db = dbconn.get();
  const collection = db.collection('hotels');

  let offset = 0;
  let count = 5;

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }

  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }

  collection
    .find()
    .skip(offset)
    .limit(count)
    .toArray((err, docs) => {
      console.log("Found hotels", docs);
      res
        .status(200)
        .json(docs);
    });

  // console.log("db", db);

  // console.log("Get the hotels");
  // console.log(req.query);

  // let returnData = hotelData.slice(offset,offset+count);

  // res
  //   .status(200)
  //   .json( returnData );
};

module.exports.hotelsGetOne = (req, res) => {
  const hotelId = req.params.hotelId;
  const thisHotel = hotelData[hotelId];
  console.log("Get hotelId", hotelId);
  res
    .status(200)
    .json( thisHotel );
};

module.exports.hotelsAddOne = (req, res) => {
  console.log("POST new hotel");
  console.log(req.body);
  res
    .status(200)
    .json(req.body);
};
