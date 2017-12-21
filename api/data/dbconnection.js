const  { MongoClient } = require('mongodb');

let _connection = null;

const open = () => {
  MongoClient.connect('mongodb://localhost:27017/meanhotel')
    .then(db => {
      console.log('Client ready');
      db.close();
    }, console.error);

    _connection = db;
    console.log(`DB connected to "${_connection}" successfully.`);
  };

const get = () => {
  return _connection;
};

module.exports = {
  open : open,
  get : get
};
