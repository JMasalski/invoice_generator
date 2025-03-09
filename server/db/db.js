import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
if(!process.env.MONGO_URI) {
  throw new Error("MONGO_URI must be defined");
}

const connectDB = async ()=>{
    try{
        await  mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to database');
    }catch(err){
        console.error('Error:',err.message);
        process.exit(1)
    }
}

export default connectDB;