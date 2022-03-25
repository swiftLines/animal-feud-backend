import { Comment } from "../models/comment.js"

function create(req, res){
  Comment.create(req.body)
  .then(comment => res.json(comment))
  .catch(err => res.json(err))
}



export{
  create,
}