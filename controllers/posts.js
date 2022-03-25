import { Post } from '../models/post.js'

function index (req, res) {
  Post.find({})
  .populate('owner')
  .then(posts => {
    res.json(posts)
  })
  .catch(err => {
    res.json(err)
  })
}

function create (req, res) {
  Post.create(req.body)
  .then(post => res.json(post))
  .catch(err => res.json(err))
}

function show (req, res) {
  Post.findById(req.params.id)
  .then(post => res.json(post))
  .catch(err => res.json(err))
}

function deletePost (req, res) {
  Post.findByIdAndDelete(req.params.id)
  .then(post => res.json(post))
  .catch(err => res.json(err))
}

export {
  index,
  create,
  show,
  deletePost as delete,
  
}