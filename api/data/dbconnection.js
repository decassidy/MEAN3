const MongoClient = require('mongodb').MongoClient;
const dburl = 'mongodb://localhost:27017/meanhotel';

let _connection = null;

const open = () => {
  MongoClient.connect(dburl, (err, db) => {
    if (err) {
      console.log("DB connection failed");
      return;
    }
    _connection = db;
    console.log(`DB connected to "${dburl}" successfully.`);
  });
};

const get = () => {
  return _connection;
};

module.exports = {
  open : open,
  get : get
};
