const mongoose = require('mongoose');
const config = require('./config.js');

const dbConnect = () => {
  try {
    if (mongoose.connections[0].readyState) {
      console.log('Database already connected');
      return;
    }
    mongoose.connect(config.DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    console.log(`Database connected established`);
  } catch (error) {
    console.log(`Database connection failed`);
  }
};

module.exports = dbConnect;
