import mongoose from 'mongoose';

const connectDB=async():Promise<void>=>{
    try{
        const conn=await mongoose.connect("mongodb+srv://Shivag:shivashiva@cluster0.mz5u2w1.mongodb.net/tweeter?retryWrites=true&w=majority");
        console.log("mongo is connected");
    }
    catch(error){
        console.log(error)
    }
}

export default connectDB;