const express = require('express');
const router = express.Router();

//@route GET api/posts
//@description gets the posts
//@access public route
router.get('/', (req, res) => {
    res.json({ messege: "this is working" });
})


module.exports = router;