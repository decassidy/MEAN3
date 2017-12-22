const mongoose = require('mongoose');
const Hotel = mongoose.model('Hotel');


// GET all reviews for a hotel
module.exports.reviewsGetAll = (req, res) => {
  const id = req.params.hotelId;
  console.log('GET reviews for hotelId', id);

  Hotel
    .findById(id)
    .select('reviews')
    .exec((err, doc) => {
      res
        .status(200)
        .json(doc.reviews);
    });
};

// GET single review for a hotel
module.exports.reviewsGetOne = (req, res) => {
  const hotelId = req.params.hotelId;
  const reviewId = req.params.reviewId;
  console.log('GET reviewId ' + reviewId + ' for hotelId ' + hotelId);

  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec((err, hotel) => {
      const review = hotel.reviews.id(reviewId);
      res
        .status(200)
        .json(review);
    });
};
