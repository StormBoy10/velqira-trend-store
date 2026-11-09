import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/velqira-store';

    // Set Mongoose connection event listeners
    mongoose.connection.on('connected', () => {
      console.log('[MongoDB Atlas] Connection established successfully.');
    });

    mongoose.connection.on('error', (err) => {
      console.error(`[MongoDB Error] Event error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('[MongoDB Atlas] Connection disconnected.');
    });

    const conn = await mongoose.connect(mongoUri);
    console.log(`[MongoDB Atlas] Host: ${conn.connection.host} | Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`[MongoDB Error] Failed to connect: ${error.message}`);
    // Non-blocking fallback so dev server remains operational
  }
};
