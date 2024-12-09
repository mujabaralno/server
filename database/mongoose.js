const mongoose = require("mongoose");
require('dotenv').config();
let cached = global.mongoose || { conn: null, promise: null };

const MONGODB_URL = process.env.MONGODB_URL;
if (!MONGODB_URL) throw new Error('MONGODB_URL is not defined');

const connectToDatabase = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  try {
    cached.promise = cached.promise || mongoose.connect(MONGODB_URL, {
      dbName: 'absen_qrcode',
      bufferCommands: false,
    });

    cached.conn = await cached.promise;
    console.log('Database connection established');
    return cached.conn;
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error; 
  }
};

module.exports = { connectToDatabase };
