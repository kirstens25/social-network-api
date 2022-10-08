// const { connect, connection } = require('mongoose');
const mongoose = require('mongoose');

module.exports = {
  start: async() => {

    // process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social';

    var isConnected = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(isConnected);

    await mongoose.set("debug", true);

    return isConnected
  }
};