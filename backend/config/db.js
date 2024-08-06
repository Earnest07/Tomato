import mongoose, { mongo } from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      // "mongodb+srv://Earnest777:Earnest777@cluster0.qggdfef.mongodb.net/food-del"
      "mongodb://localhost:27017/Tomato"
    )
    .then(() => {
      console.log("DB connected");
    });
};
