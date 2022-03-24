import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  content: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId, ref:"Profile"
  },
},{
  timestamps: true,
})

const Comment = mongoose.model('Comment', commentSchema)

export{Comment}