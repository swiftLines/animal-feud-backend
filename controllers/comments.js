import { Comment } from "../models/comment.js"
import { Post } from "../models/post.js"

function newComment (req, res){
Comment.find({})
.then(comment => res.json(comment))
.catch(err => res.json(err))
}

function create(req, res){
  Comment.create(req.body)
  .then(comment => {
    Post.findById(req.params.postId).then(post => {
      post.comments.push(comment._id)
      post.save()
      res.json(comment)
    })
    // .then(populatedComment => {res.json(populatedComment)})
  }) 
  .catch(err => res.json(err))
}



export{
  create,
  newComment as new,
}