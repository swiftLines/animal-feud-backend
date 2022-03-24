import mongoose  from "mongoose";

const postSchema =new mongoose.Schema({
  name: String,
  content: String
})