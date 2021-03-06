const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const key = "secretkey";
const User = require('./model/User');



router.post('/register', (req, res) => {
    let {
        name,
        username,
        email,
        password,
        confirm_password,
        type
    } = req.body
    if (password !== confirm_password) {
        return res.status(400).json({
            msg: "Password do not match."
        });
    }
    // Check for the unique Username
    User.findOne({
        username: username
    }).then(user => {
        if (user) {
            return res.status(400).json({
                msg: "Username is already taken."
            });
        }
    }).catch(err=>{
        return res.send(err);    })
    // Check for the Unique Email
    User.findOne({
        email: email
    }).then(user => {
        if (user) {
            return res.status(400).json({
                msg: "Email is already registred. Did you forgot your password."
            });
        }
    });
    // The data is valid and new we can register the user
    let newUser = new User({
        name,
        username,
        password,
        email,
        type
    });
    newUser.type = "user";
    // Hash the password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then(user => {
                return res.status(201).json({
                    success: true,
                    msg: "Hurry! User is now registered."
                });
            });
        });
    });
});
router.post('/login', (req, res) => {
    User.findOne({
        username: req.body.username
    }).then(user => {
        if (!user) {
            return res.status(404).json({
                msg: "Username is not found.",
                success: false
            });
        }
        bcrypt.compare(req.body.password, user.password).then(isMatch => {
            if (isMatch) {
                // User's password is correct and we need to send the JSON Token for that user
                const payload = {
                    _id: user._id,
                    username: user.username,
                    name: user.name,
                    email: user.email
                }
                jwt.sign(payload, key, {
                    expiresIn: 604800
                }, (err, token) => {

                   return res.status(200).json({
                        success: true,
                        token: `Bearer ${token}`,
                        user: user,
                        msg: "Hurry! You are now logged in."
                    });
                })
            } else {
                return res.status(404).json({
                    msg: "Incorrect password.",
                    success: false
                });
            }
        })
    });
});


router.get('/profile', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    return res.json({
        user: req.user
    });
});

router.put('/updateProfile/:id',async (req, res) =>{
    const {name, username, email} = req.body;
    const user= await User.findByIdAndUpdate(req.params.id, {
        name,
       username,
    email
    }).catch((err)=>{
        if(err){
            res.send(err);
        }
    })
    return res.status(201).json({
        success: true,
        msg: "User is now Updated."
    });

})





module.exports = router;


