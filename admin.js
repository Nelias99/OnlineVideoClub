const express = require('express');
const router = express.Router();
const User = require('./model/User');

router.delete('/deluser/:userID',async (req, res) => {
    const user=await User.findById(req.params.userID);
    if(user)
    {
        await user.remove();
    }
    return res.status(201).json({
        success: true,
        msg: "User is deleted"
    });
})

router.get('/userlist' , function (req , res) {
    User.find({}).then(function (users) {
    res.send(users);
    });
   });



module.exports=router;