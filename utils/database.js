// import mongoose from "mongoose";

// let isConnected = false;

// console.log(process.env.MONGODB_URI);

// export const connectToDb = async () => {
//   mongoose.set("strictQuery", true);

//   if (isConnected) {
//     console.log("Mongodb is Already Connected");
//     return;
//   }

//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       dbName: "serviceDB",
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     isConnected = true;

//     console.log("Mongodb Connected");
//   } catch (error) {
//     console.log(error);
//   }
// };


import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectToDb = async () => {
  if (cached.conn) {
    console.log("Connected From Cache");
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, { dbName: "serviceDB" })
      .then((result) => {
        console.log("Connected to MongoDB");
        return result;
      })
      .catch((error) => {
        console.error("Error connecting to MongoDB", error);
        throw error;
      });
  }

  cached.conn = await cached.promise;

  return cached.conn;
};