
import mongoose  from "mongoose";

const Schema = mongoose.Schema 

const evidenceSchema = new Schema({
  source: String,
  notes: String, 
})

const postSchema =new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId, ref:"Profile"
  },
  content: {type: String, required: true},
  photo:{type: String},
  isFact: Boolean,
  evidence: [evidenceSchema],
  comments: [{type: Schema.Types.ObjectId, ref:"Comment"}],
  createdAt: { type: Date, required: true, default: Date.now }
},{
  timestamps: true,
})

const Post = mongoose.model('Post', postSchema)

export{
  Post
}