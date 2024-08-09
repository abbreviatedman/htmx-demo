import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

export default function connectToMongoDB() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("MONGODB CONNECTED");
    })
    .catch((e) => {
      console.log(e);
    });
}
