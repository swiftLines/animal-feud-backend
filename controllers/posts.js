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

function show (req, res) {

}

function create (req, res) {
  
}

export {
  index,
  create,
  show,
}