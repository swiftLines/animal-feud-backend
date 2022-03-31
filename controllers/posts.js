import { Post } from '../models/post.js'
import {v2 as cloudinary} from 'cloudinary'
// import req from 'express/lib/request'
// import res from 'express/lib/response'

function index (req, res) {
  Post.find({})
  .populate('owner')
  .populate('comments')
  .then(posts => {
    res.json(posts)
  })
  .catch(err => {
    res.json(err)
  })
}

function create(req, res) {
  req.body.owner = req.user.profile
  req.body.isFact = !!req.body.isFact
  if (req.body.photo === 'undefined') {
    delete req.body['photo']
    Post.create(req.body)
    .then(post => {
    post.populate('owner')
    .then(populatedPost => {
    res.json(populatedPost)
  })
})
  .catch(err => {
    console.log(err)
    res.json(err)
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
        res.json(populatedPost)
      })
    })
    .catch(err => {
      console.log(err)
      res.json(err)
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
  .catch(err => {
    console.log(err)
    res.json(err)
  })
}

function addComment(req, res){
  Post.findById(req.params.id)
  .then(post => {
    post.comments.push(req.body.commentId)
    post.save()
    .then(postComment => {res.json(postComment)})
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
  addComment,
}