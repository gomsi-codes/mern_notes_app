import mongoose from 'mongoose';

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('mongo db connected successfully');
    }
    catch(err) {
        console.log('Error connecting to mongo db', err);
        process.exit(1); // exit with failure
    }
}