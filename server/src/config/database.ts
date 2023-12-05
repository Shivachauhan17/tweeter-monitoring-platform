import mongoose,{ConnectOptions} from 'mongoose';

const connectDB=async():Promise<void>=>{
    try{
        const conn=await mongoose.connect(process.env.DB_STRING as string,{
            useUnifiedTopology:true,
        } as ConnectOptions);
        console.log("mongo is connected");
    }
    catch(error){
        console.log(error)
        process.exit(1)
    }
}

export default connectDB;