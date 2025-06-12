import mongoose from 'mongoose';

const dbConnect = async () => {
    const CONNECTION_URL = process.env.CONNECTION_URL;
    try {
        await mongoose.connect(CONNECTION_URL);
        console.log('Connected to MongoDB Atlas...');
    } catch (err) {
        console.log('Connection failed: ', err.message);
        process.exit(1);
    }
};

export default dbConnect;