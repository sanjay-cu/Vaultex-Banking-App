import mongoose from 'mongoose';

let cachedConnection: typeof mongoose | null = null;

export async function connectDB() {
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  try {
    // Prioritize environment variable, then fallback to hardcoded (for development/deployment ease)
    const mongoURI = process.env.MONGODB_URI || "mongodb+srv://sanjay:Sanjay123@cluster0.teqwbus.mongodb.net/";
    
    if (!mongoURI) {
      console.error('CRITICAL ERROR: MONGODB_URI is missing!');
      throw new Error('Connection failed: Database URI not provided.');
    }

    // Use buffered commands to avoid errors if connection is still pending
    mongoose.set('bufferCommands', true);

    console.log('Connecting to MongoDB...');
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000, // 5 second timeout for server selection
      connectTimeoutMS: 10000,        // 10 second timeout for connection
    });
    
    cachedConnection = conn;
    console.log('Successfully connected to MongoDB.');
    return conn;
  } catch (error: any) {
    console.error('FAILED to connect to MongoDB:', error.message);
    // Re-throw so callers (like middleware) know it failed
    throw error;
  }
}
