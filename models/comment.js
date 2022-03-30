import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema({
  content: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId, ref:"Profile"
  },
  createdAt: {type: Date, required: true, default: Date.now}
},{
  timestamps: true,
})

const Comment = mongoose.model('Comment', commentSchema)

export{Comment}