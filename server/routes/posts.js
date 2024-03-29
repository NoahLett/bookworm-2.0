const router = require('express').Router();
const Post = require('../models/Post')

//Create Post
router.post('/', async (req, res) => {
    const newPost = new Post(req.body);

    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json(error)
    }
});

//Get All Sale Posts
router.get('/sale', async (req, res) => {
    try {
        const salePosts = await Post.find({ 
            sale: true,
         });
         res.status(200).json(salePosts);
    } catch (error) {
        res.status(500).json(error);
    }
})

//Get All Want Posts
router.get('/want', async (req, res) => {
    try {
        const wantPosts = await Post.find({
            sale: false,
        });
        res.status(200).json(wantPosts);
    } catch (error) {
        res.status(500).json(error);
    }
})

//Update Post
router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({
                $set: req.body,
            });
            res.status(200).json({ message: 'Post updated successfully.' });
        } else {
            res.status(403).json({ message: 'You are unauthorized to modify this post.' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

//Delete Post
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json({ message: 'Post deleted successfully.' });
        } else {
            res.status(403).json({ message: 'You are unauthorized to delete this post.' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

//Like and Dislike Post
router.put('/:id/like', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({
                $push: { likes: req.body.userId }
            });
            res.status(200).json({ message: 'Post has been liked.' });
        } else {
            await post.updateOne({
                $pull: { likes: req.body.userId }
            });
            res.status(200).json({ message: 'Post has been disliked.' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

//Get Post
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
})


module.exports = router;