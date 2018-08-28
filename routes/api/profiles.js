const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');


//load profile model
const profile = require('../../models/Profile');
//load user model
const user = require('../../models/User');




//@route GET api/profiles/test
//@description gets the profiles
//@access public route
router.get('/test', (req, res) => {
    res.json({ name: "sachin", lastname: "thakur" });
})

//@route GET api/profile
//@description gets the profile of current user
//@access private route
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    errors = {};
    profile.findOne({ user: req.user.id })
        .then((profile) => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user'
                return res.status(404).json(errors)
            }
            res.json(profile)
        })
        .catch(err => res.status(404).json(err)
        )

})


//@route POST api/profile
//@description CREATE  profile of current user
//@access private route

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

})



module.exports = router;