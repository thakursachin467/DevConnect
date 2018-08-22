const express = require('express');
const router = express.Router();

//@route GET api/profiles
//@description gets the profiles
//@access public route
router.get('/', (req, res) => {
    res.json({ name: "sachin", lastname: "thakur" });
})


module.exports = router;