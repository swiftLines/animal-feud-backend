import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId, ref:"Profile"
  },
  content: String,
  createdAt: {type: Date, required: true, default: Date.now}
},{
  timestamps: true,
})

const Comment = mongoose.model('Comment', commentSchema)

export{Comment}