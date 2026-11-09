import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

console.log('[Diagnostic Test] Attempting MongoDB Atlas Connection...');
console.log('Target MONGO_URI:', process.env.MONGO_URI ? process.env.MONGO_URI.replace(/:([^@]+)@/, ':****@') : 'Not defined');

async function testConnection() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('SUCCESS: Connected to MongoDB Atlas cluster successfully!');
    await mongoose.disconnect();
  } catch (err) {
    console.error('FAILED:', err.message);
  }
}

testConnection();
