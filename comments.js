// Create web server
// Create a new comment
// Update a comment
// Delete a comment
// Added a new comment

const express = require('express');
const router = express.Router();

// Load Comment model
const Comment = require('../models/Comment');

// @route GET api/comments
// @desc Get all comments
// @access Public
router.get('/', (req, res) => {
  Comment.find()
    .then(comments => res.json(comments))
    .catch(err => res.status(404).json({ noCommentsFound: 'No comments found' }));
});

// @route POST api/comments
// @desc Create a new comment
// @access Public
router.post('/', (req, res) => {
  const newComment = new Comment({
    name: req.body.name,
    content: req.body.content,
    date: req.body.date
  });

  newComment.save().then(comment => res.json(comment));
});

// @route PUT api/comments/:id
// @desc Update a comment
// @access Public
router.put('/:id', (req, res) => {
  Comment.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(comment => res.json(comment))
    .catch(err => res.status(404).json({ noCommentFound: 'No comment found' }));
});

// @route DELETE api/comments/:id
// @desc Delete a comment
// @access Public
router.delete('/:id', (req, res) => {
  Comment.findByIdAndRemove(req.params.id)
    .then(() => res.json({ success: true }))
    .catch(err => res.status(404).json({ noCommentFound: 'No comment found' }));
});

module.exports = router;
