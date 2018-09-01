const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//posts model
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
//validations
const postsValidation = require('../../Validation/posts')


//@route GET api/posts/test
//@description test the api 
//@access public route
router.get('/test', (req, res) => {
    res.json({ messege: "this is working" });
});


//@route POST api/posts
//@description create a post
//@access private route
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = postsValidation(req.body);
    //check validations
    if (!isValid) {
        //if any error return all the errors
        return res.status(400).json(errors);
    }
    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });
    newPost.save()
        .then((post) => res.json(post))
        .catch((err) => res.status(404).json(err))
});


//@route GET api/posts
//@description get all   posts
//@access public route
router.get('/', (req, res) => {
    Post.find()
        .sort({ date: -1 })
        .then((posts) => {
            res.json(posts);
        })
        .catch((err) => {
            errors.nopostsfound = "Posts Not found";
            res.status(404).json(errors)
        })
});


//@route GET api/posts/:post_id
//@description get a single  posts
//@access public route
router.get('/:post_id', (req, res) => {
    let errors = {}
    Post.findById(req.params.post_id)
        .then((post) => {
            if (!post) {
                errors.nopostfound = "No posts found";
                return res.status(404).json(errors);
            } else {
                res.json(post);
            }
        })
        .catch((err) => {
            errors.nopostfound = "Post Not found";
            res.status(404).json(errors)
        })
});


//@route DELETE api/posts/:post_id
//@description delete a   posts
//@access private route
router.delete('/:post_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    let errors = {}
    Profile.findOne({ user: req.user.id })
        .then((profile) => {
            Post.findById(req.params.post_id)
                .then(post => {
                    //check if the post owner and login user are same
                    if (post.user.toString() !== req.user.id) {
                        errors.autherror = "You are not authorize";
                        return res.status(401).json(errors)

                    }
                    //delete post
                    post.remove()
                        .then(() => {
                            res.json({ success: "true" })
                        })
                        .then(() => {
                            errors.internalerror = "something went wrong. Please try again"
                            res.status(404).json(errors);
                        })

                })
                .catch(() => {
                    errors.postnotfound = "Post Not Found"
                    res.status(404).json(errors);
                });

        })
        .catch(() => {
            errors.postnotfound = "Something Went wrong.Please try action again"
            res.status(404).json(errors);
        });
});


//@route POST api/posts/like/:post_id
//@description like  posts
//@access private route
router.post('/like/:post_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    let errors = {}
    Profile.findOne({ user: req.user.id })
        .then((profile) => {
            Post.findById(req.params.post_id)
                .then(post => {
                    //check if user has already liked the post or not
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                        errors.alereadylike = "user already liked this post";
                        return res.status(400).json(errors)
                    }
                    //add the current users like to the list of likes
                    post.likes.unshift({ user: req.user.id })
                    post.save()
                        .then((post) => {
                            res.json(post)
                        })
                        .catch(() => {
                            errors.error = "Action not complete";
                            res.status(400).json(errors);
                        })


                })
                .catch(() => {
                    errors.postnotfound = "Something Went wrong.Please try action again"
                    res.status(404).json(errors);
                });
        });
});


//@route POST api/posts/unlike/:post_id
//@description unlike  posts
//@access private route
router.post('/unlike/:post_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    let errors = {}
    Profile.findOne({ user: req.user.id })
        .then((profile) => {
            Post.findById(req.params.post_id)
                .then(post => {
                    //check if user has already liked the post or not
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                        errors.notliked = "You have not liked this post";
                        return res.status(400).json(errors)
                    }

                    //get remove index
                    const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
                    //splice it out of array
                    post.likes.splice(removeIndex, 1);
                    post.save()
                        .then((post) => {
                            res.json(post)
                        })
                        .catch(() => {
                            errors.error = "Something went wrong";
                            return res.status(400).json(errors)
                        })


                })
                .catch((err) => {
                    errors.postnotfound = "Something Went wrong.Please try action again";

                    res.status(404).json(errors);
                });
        });
});



//@route POST api/posts/comment/:post_id
//@description comment on a   posts
//@access private route

router.post('/comment/:post_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = postsValidation(req.body);
    //check validations
    if (!isValid) {
        //if any error return all the errors
        return res.status(400).json(errors);
    }

    Post.findById(req.params.post_id)
        .then((post) => {
            const newComment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id
            }
            //add to comments array
            post.comments.unshift(newComment);
            post.save()
                .then(post => {
                    res.json(post)
                })
                .catch(() => {
                    errors.error = "Something went wrong.Please try again";
                    res.status(404).json(errors)
                })
        })
        .catch(() => {
            errors.error = "No post found";
            res.status(404).json(errors);
        })
});


//@route DELETE api/posts/comment/:post_id/:comment_id
//@description delete comment on a   posts
//@access private route

router.delete('/comment/:post_id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    let errors = {}

    Post.findById(req.params.post_id)
        .then((post) => {
            //check if the comment exists
            if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
                errors.error = "Comment does not exist";
                return res.status(404).json(errors);
            }

            //check if the comment belongs to the user
            if (post.comments.filter(comment => comment.user.toString() === req.user.id).length === 0) {
                errors.error = "You cannot delete this comment";
                return res.status(404).json(errors);
            }

            //get the index of the comment to be deleted
            const removeIndex = post.comments
                .map(comment => comment._id.toString())
                .indexOf(req.params.comment_id)
            post.comments.splice(removeIndex, 1)
            post.save()
                .then(post => {
                    res.json(post)
                })
                .catch((err) => {
                    errors.error = "Some error occured";
                    res.status(404).json(errors);
                })
        })
        .catch(() => {
            errors.error = "No post found";
            res.status(404).json(errors);
        })
});





module.exports = router;