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



    //education info of the user
    profileFields.education = [];
    //school info
    let schoolinfo = {};
    //school name
    if (req.body.school) schoolinfo.school = req.body.school;
    //degree from that school
    if (req.body.degree) schoolinfo.degree = req.body.degree;
    //specialization
    if (req.body.fieldofstudy) schoolinfo.fieldofstudy = req.body.fieldofstudy;
    //starting of the school
    if (req.body.fromschool) schoolinfo.from = req.body.fromschool;
    //end of the school
    //if it is undefined means he is currently studying
    if (req.body.toschool === 'undefined') {
        schoolinfo.current = true;
    } else {
        schoolinfo.toschool = req.body.toschool;
    }
    //description if user wants to give
    if (req.body.description !== 'undefined') {
        schoolinfo.description = req.body.descriptionschool;
    }
    //pushing the object into the main education array
    profileFields.education.push(schoolinfo);


    //experience info of the user(can be many experience)
    profileFields.experience = []
    //experience info(single experience complete info)
    let experiences = {};
    if (req.body.title) experience.title = req.body.title;
    if (req.body.company) experience.company = req.body.company;
    if (req.body.location) experience.location = req.body.location;
    if (req.body.fromjob) experience.from = req.body.fromjob;
    if (req.body.tojob === 'undefined') experience.current = true;
    if (req.body.tojob !== 'undefined') experience.to = req.body.tojob;
    if (req.body.jobdescription) experience.description = req.body.description;
    profileFields.experience.push(experiences);


})



module.exports = router;