import mongoose from 'mongoose';

let cachedConnection: typeof mongoose | null = null;

export async function connectDB() {
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      throw new Error('MONGODB_URI is not defined in .env');
    }

    // Use buffered commands to avoid errors if connection is still pending
    mongoose.set('bufferCommands', true);

    const conn = await mongoose.connect(mongoURI);
    cachedConnection = conn;
    console.log('Successfully connected to MongoDB.');
    return conn;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    // Return null or re-throw so callers know it failed
    return null;
  }
}
