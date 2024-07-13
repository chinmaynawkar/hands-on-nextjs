import mongoose from "mongoose";

export async function connectDB() {
    try {
        mongoose.connect(process.env.MONGO_URI as string);
        const connection = await mongoose.connection;
        
        connection.on('connected', () => {
            console.log('Connected to DB');
        });
        connection.on('error', (error) => {
            console.log('Error connecting to DB', error);
            process.exit(1);
        });

    } catch (error) {
        console.log('Error connecting to DB', error);
        console.log(error);
    }
}