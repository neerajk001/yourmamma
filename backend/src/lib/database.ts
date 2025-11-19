import mongoose from 'mongoose';

const connectdb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL!);
    console.log(`MongoDB is connected to ${conn.connection.host}`);
  } catch (error) {
    console.log('Error in connecting to database:', error);
    process.exit(1);
  }
};

export default connectdb;
