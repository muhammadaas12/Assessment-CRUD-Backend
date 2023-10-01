const mongoose = require('mongoose');
require('dotenv').config();

var conn = process.env.MONGOURI;
console.log(conn);
const connectdb = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Connection established on ${con.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
  }
};

module.exports = connectdb;
