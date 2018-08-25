const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../../models/User');
const secret = require('../../config/keys');


//load input validation
const validInput = require('../../Validation/register');

//@route GET api/users
//@description gets the users
//@access public route
router.get('/test', (req, res) => {
    res.json({ msg: "API WORKING " });
})


//@route GET api/users/register
//@description register  the users
//@access public route

router.post('/register', (req, res) => {
    const { errors, isValid } = validInput(req.body);
    //check validation
    if (!isValid) {
        res.status(400).json(errors);

    } else {
        User.findOne({ email: req.body.email })
            .then((user) => {
                if (user) {
                    errors.email = 'Email already exists'
                    return res.status(400).json(errors)
                } else {
                    const avatar = gravatar.url(req.body.email, {
                        s: "200", //size
                        r: "pg", //rating
                        d: "mm" //default
                    })
                    newUser = new User(
                        {
                            name: req.body.name,
                            email: req.body.email,
                            avatar,
                            password: req.body.password
                        }
                    );
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser.save()
                                .then((user) => res.json(user))
                                .catch(err => console.log(err));
                        })
                    })
                }

            })

    }

});

//@route GET api/users/login
//@description login  the users/ returning the jwt
//@access public route

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    //find user by email
    User.findOne({ email })
        .then((user) => {
            //check for user
            if (!user) {
                res.status(404).json({ email: "user not found" })
            }

            //check password
            bcrypt.compare(password, user.password)
                .then((isMatch) => {
                    if (isMatch) {
                        //user matched
                        const payload = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar
                        } //created jwt payload

                        //sign token
                        jwt.sign(payload, secret.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            });
                        });
                    } else {
                        //user not matched
                        return res.status(400).json({ password: "incorrect password" })
                    }
                })
        })
});

//@route GET api/users/current
//@description returns the current user
//@access private route

router.get('/current', passport.authenticate('jwt', { session: false }, (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar
    })
}))


module.exports = router;