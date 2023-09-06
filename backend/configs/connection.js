import mongoose from "mongoose";
import {config}  from "./config.js";



export const connection = async () => {
  try {
    
    await mongoose.connect(config.mongoURI);
    console.log("DB connected")
  } catch (error) {
    console.log(error)
  }
};