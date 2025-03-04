import mongoose from "mongoose";

const connectDB= async()=>{
    try{
        const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`MONGODB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch(error){
        console.log("MongoDB connection Error");
        process.exit(1);
    }
}

export default connectDB;
