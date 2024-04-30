import mongoose from "mongoose";

// Function to connect to MongoDB database
const connectDB = async () => {
  try {
    // Connect to MongoDB using Mongoose
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    // Log a success message if connection is established
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log error message if connection fails and exit the process
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
