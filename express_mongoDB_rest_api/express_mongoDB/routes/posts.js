const { request, response } = require('express');
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');


// Gets all the posts
router.get('/', async (resquest, response) => {
    // response.send("Post page")
    try {
        const post = await Post.find();
        response.json(post);
    } catch (err) {
        response.json({ message: err })
    }

});


// Insert new post in db // Creates a new post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    console.log(req.body);
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        res.json({ message: err })
    }

    // post.save()
    //     .exec()
    //     .then(date => {
    //         res.json(date);
    //     }).catch(err => {
    //         console.log("Error occured in post!")
    //         res.json({ message: err })
    //     })
})


// Get a post by post Id 
router.get('/:postId', async (request, response) => {
    try {
        const post = await Post.findById(request.params.postId);
        response.json(post);
    } catch (err) {
        response.json({ message: err })
    }

});

// Delete a post
router.delete('/:postId', async (request, response) => {
    try {
        const removedPost = await Post.remove({ _id: request.params.postId });
        response.json(removedPost);
    } catch (err) {
        response.json({ message: err })
    }
});

// Update a post
router.patch('/:postId', async (request, response) => {
    try {
        const updatedPost = await Post.updateOne({ _id: request.params.postId }, { $set: { title: request.params.title } });
        response.json(updatedPost);
    } catch (err) {
        response.json({ message: err })
    }
})


module.exports = router;