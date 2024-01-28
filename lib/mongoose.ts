import mongoose from 'mongoose';

let isConnected: boolean = false;

export const connectToDatabase = async () => {
    mongoose.set("strictQuery", true);
    if (!process.env.MONGO_URL) {
        return console.log("Missing MONGO_URL");
    }

    if (isConnected) {
        return;
    }
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName: "liftlink"
        });
        isConnected = true;
        console.log("MongoDB is connected!")
    } catch (error) {
        console.log(error);
    }
}