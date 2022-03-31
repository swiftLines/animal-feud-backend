import { Comment } from "../models/comment.js"

function newComment (req, res){
Comment.find({})
.then(comment => res.json(comment))
.catch(err => res.json(err))
}

function create(req, res){
  // req.body.owner = req.user.profile
  Comment.create(req.body)
  .then(comment => {
    comment.populate('owner')
    .then(populatedComment => {res.json(populatedComment)})
  }) 
  .catch(err => res.json(err))
}



export{
  create,
  newComment as new,
}