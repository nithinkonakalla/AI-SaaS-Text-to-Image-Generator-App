import mongoose from "mongoose"

const connectDB = async () => {
    mongoose.connection.on('connected',()=>{
        console.log('Database connected')
    })
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}imagify`);
    } catch (error) {
        console.error('Error connecting to the database', error);
    }
};
export default connectDB