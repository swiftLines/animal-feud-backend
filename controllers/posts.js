import { Post } from '../models/post.js'
import {v2 as cloudinary} from 'cloudinary'
// import req from 'express/lib/request'
// import res from 'express/lib/response'

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

// async function create (req, res) {
//   const newPost = await Post.create(req.body)
//   const foundPost = await Post.findById(newPost._id)
//   foundPost.populate('owner')
//   .then(post => res.json(post))
//   .catch(err => res.json(err))
// }
function create(req, res) {
  req.body.owner = req.user.profile
  if (req.body.photo === 'undefined' || !req.files['photo']) {
    delete req.body['photo']
    Post.create(req.body)
    .then(post => {
    post.populate('owner')
    .then(populatedPost => {
    res.status(201).json(populatedPost)
  })
})
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
  
} else {
  const imageFile = req.files.photo.path
  cloudinary.uploader.upload(imageFile, {tags: `${req.body.name}`})
  .then(image => {
    req.body.photo = image.url
    Post.create(req.body)
    .then(post => {
      post.populate('owner')
      .then(populatedPost => {
        res.status(201).json(populatedPost)
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  })
}
}
  

function show (req, res) {
  Post.findById(req.params.id)
  .populate('owner')
  .then(post => res.json(post))
  .catch(err => res.json(err))
}

function deletePost (req, res) {
  Post.findByIdAndDelete(req.params.id)
  .then(post => res.json(post))
  .catch(err => res.json(err))
}

function update (req, res) {
  Post.findByIdAndUpdate(req.params.id, req.body, {new:true})
  .then(post => res.json(post))
  .catch(err => res.json(err))
}

function createEvidence(req, res){
  Post.findById(req.params.id)
  .then(post => {
    post.evidence.push(req.body)
    post.save()
    .then(postEvidence => {res.json(postEvidence)})
  })
  .catch(err => res.json(err))
}

export {
  index,
  create,
  show,
  deletePost as delete,
  update,
  createEvidence,
}