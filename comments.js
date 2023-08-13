// Create web server
// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require('crypto');

// Create a new express app
const app = express();

// Allow cross-origin resource sharing
app.use(cors());

// Parse the body of incoming requests
app.use(bodyParser.json());

// Create an in-memory database of comments
const commentsByPostId = {};

// Get all comments for a given post
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Create a new comment for a given post
app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  // Get the list of comments for a given post
  const comments = commentsByPostId[req.params.id] || [];

  // Add a new comment to the list
  comments.push({ id: commentId, content });

  // Update the comments for a given post
  commentsByPostId[req.params.id] = comments;

  // Send the newly created comment back to the client
  res.status(201).send(comments);
});

// Start the express app on port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});