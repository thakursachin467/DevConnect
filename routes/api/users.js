const express = require('express');
const router = express.Router();

//@route GET api/users
//@description gets the users
//@access public route
router.get('/', (req, res) => {
    res.json({ name: "sachin" });
})


module.exports = router;