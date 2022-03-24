import { links } from "express/lib/response";
import mongoose  from "mongoose";

const Schema = mongoose.Schema 

evidenceSchema = new mongoose.Schema({
  source: String,
  notes: String, 
})

const postSchema =new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId, ref:"Profile"
  },
  content: String,
  photo:{type: String},
  isFact: Boolean,
  evidence: [evidenceSchema],
  comments: [{type: mongoose.Schema.Types.ObjectId, ref:"Comment"}]
},{
  timestamps: true,
})

const Post = mongoose.model('Post', postSchema)

export{
  Post
}