import { Comment } from "../models/comment.js"
import { Post } from "../models/post.js"

function newComment (req, res){
Comment.find({})
.then(comment => res.json(comment))
.catch(err => res.json(err))
}

function create(req, res){
  req.body.owner = req.user.profile
  Comment.create(req.body)
  .then(comment => {
    Post.findById(req.params.postId).then(post => {
      post.comments.push(comment._id)
      post.save()
      post.populate(['owner', 'comments'])
      .then(post => {
        res.json(post)
      })
    })
  }) 
  .catch(err => res.json(err))
}


// function create(req, res){
//   console.log('comment hit')
//   Comment.create(req.body)
//   .then(comment => {
//     comment.populate('owner')
//     .then(populatedComment => {
//       Post.findById(req.params.postId)
//       .then(post => {
//         post.comments.push(populatedComment)
//         .then(populatedComment => res.json(populatedComment))
//       })
//     })
//   }) 
//   .catch(err => res.json(err))
// }



export{
  create,
  newComment as new,
}