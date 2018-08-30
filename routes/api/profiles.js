const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//load the validations
const profileValidation = require('../../Validation/profile');

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

//<----all main api start from here ---->

//@route GET api/profile
//@description gets the profile of current user
//@access private route
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    errors = {};
    profile.findOne({ user: req.user.id })
        .populate('user', ['name', 'avatar'])
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


//@route GET api/profile/all
//@description gets the profile of all users 
//@access public route

router.get('/users', (req, res) => {
    const errors = {}
    profile.find()
        .populate('user', ['name', 'avatar'])
        .then((profiles) => {
            if (!profiles) {
                errors.noprofile = "There are no profiles";
                res.status(404).json(errors);
            }
            res.json(profiles)

        })
        .catch(err => {
            errors.servererror = "There are no profiles"
            res.status(500).json(errors)
        })
})




//@route GET api/profile/handle/:handle
//@description gets the profile by handle 
//@access public route

router.get('/handle/:handle', (req, res) => {
    const errors = {}
    profile.findOne({ handle: req.params.handle })
        .populate('user', ['name', 'avatar'])
        .then((profile) => {
            if (!profile) {
                errors.noprofile = "There is no profile for this user";
                res.status(400).json(errors);
            }
            res.json(profile)

        })
        .catch(err => {
            console.log(err)
            errors.servererror = "Internal server error"
            res.status(500).json(errors)
        })
})


//@route GET api/profile/user/:user_id
//@description gets the profile by user id 
//@access public route

router.get('/user/:user_id', (req, res) => {
    const errors = {}
    profile.findOne({ user: req.params.user_id })
        .populate('user', ['name', 'avatar'])
        .then((profile) => {
            if (!profile) {
                errors.noprofile = "There is no profile for this user";
                res.status(400).json(errors);
            }
            res.json(profile)

        })
        .catch(err => {
            console.log(err)
            errors.servererror = "There is no profile for this user"
            res.status(500).json(errors)
        })
})








//@route POST api/profile
//@description CREATE or edit  profile of current user
//@access private route

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = profileValidation(req.body);

    //check the validation
    if (!isValid) {
        //return errors with 400 status
        return res.status(400).json(errors);
    }
    //create profile fields
    const profileFields = {}
    //will create the user which will contain name and avatar
    profileFields.user = req.user.id;
    //users handle will be used to access the account of user like mysite.com/userhandle
    if (req.body.handle) profileFields.handle = req.body.handle;
    //users company if any
    if (req.body.company) profileFields.company = req.body.company;
    //users website if any
    if (req.body.website) profileFields.website = req.body.website;
    //users current living location
    if (req.body.location) profileFields.location = req.body.location;
    //github username of the user..will be used to fetch the data from github api
    if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;
    //bio of the user
    if (req.body.bio) profileFields.bio = req.body.bio;
    //status of the user
    if (req.body.status) profileFields.status = req.body.status;
    //skills will be an array as we can have many skills
    if (typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',');
    }


    //social accounts of the user
    profileFields.social = {}
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;


    //save the data to our database
    profile.findOne({ user: req.user.id })
        .then((user) => {
            if (user) {
                //update the profile
                profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true })
                    .then((user) => res.json(user))
                    .catch((err) => console.log(err))


            } else {
                //create the profile
                //check if the handle exists
                profile.findOne({ handle: profileFields.handle })
                    .then((user) => {
                        if (user) {
                            errors.handle = "The handle already exists";
                            res.status(400).json(errors);
                        } else {
                            //save the profile
                            new profile(profileFields).save()
                                .then((profile) => {
                                    res.json(profile);
                                })
                                .catch(err => console.log(err))
                        }
                    })
            }
        })






})



//@route POST api/profile/experience
//@description add experience to  the profile of user
//@access private route

router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
    profile.findOne({ user: req.user.id })
        .then((profile) => {
            const newExp = {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            }

            //add to experience array
            profile.experience.unshift(newExp);
            profile.save()
                .then((profile) => {
                    res.json(profile)
                })
        })
})



module.exports = router;