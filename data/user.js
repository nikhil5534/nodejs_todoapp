import mongoose from "mongoose";

const dbURI = process.env.MONGO_DB;

export const connectDb = () => {
  mongoose
    .connect(dbURI)
    .then(() => console.log("Database Connected"))
    .catch((error) => console.log("Failed to connect to the database:", error));
};
