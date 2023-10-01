const mongoose = require('mongoose');

const connectdb = async () => {
  try {
    const con = await mongoose.connect('mongodb+srv://codingmania32:54321@cluster0.zhxdgyy.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Connection established on ${con.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
  }
};

module.exports = connectdb;
