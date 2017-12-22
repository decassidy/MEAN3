const mongoose = require('mongoose');
const dburl = 'mongodb://localhost:27017/meanhotel';
const retry = null;
mongoose.connect(dburl);

// CONNECTION EVENTS
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to ' + dburl);
});
mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown((msg, callback) => {
  mongoose.connection.close(() => {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
});

// For nodemon restarts
process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});
// For app termination
process.on('SIGINT', () => {
  gracefulShutdown('App termination (SIGINT)', () => {
    process.exit(0);
  });
});
// For Heroku app termination
process.on('SIGTERM', () => {
  gracefulShutdown('App termination (SIGTERM)', () => {
    process.exit(0);
  });
});

// BRING IN YOUR SCHEMAS & MODELS
require('./hotels.model');
