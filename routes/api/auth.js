const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');  //need the jwt secret
const jwt = require('jsonwebtoken'); //need jwt
const auth = require('../../middleware/auth')
//bring in item model

const User = require('../../models/User');

//@route Post api/auth: 
//@desc  Authenticate user
//@access Public (note we are using router, so we have router.get and not app.get)
router.post('/', (req, res)=>{
  const { email, password } = req.body;  //pull out these properties from the body of the post request.
  if (!email || !password){
    return res.status(400).json({msg: "Please enter all fields."});  //400 means its a bad request
  }

  User.findOne({email: email})  //find the email that matches
    .then(user =>{
      if (!user){  //user is either null or a user exists
        return res.status(400).json({msg: "User does not exist."});
      };
      //validate password
      bcrypt.compare(password, user.password)  //compare password with hashed password
        .then(isMatch =>{  //isMatch is a boolean that is returned from the compare method.
          if (!isMatch){
            return res.status(400).json({msg: "Invalid credentials."})
          }
          jwt.sign( //we put information in here to code the web token.
            {
              id: user.id,  //this is ok since we know user from line 21
            },
            config.get('jwtSecret'),
            {expiresIn: 3600}, (err, token)=>{
              if (err) throw err;
              res.json({
                token: token,  //send the token along with the user to the browser.
                user:{
                  id: user.id,
                  email: user.email
                }
              })
            })
        })
    })
  
})  //Note the end point is api/item here because of how we defined it.

//@route GET api/auth/user: 
//@desc  Get user data, authenticate with the token and use its id to get user data from the server.
//@access Private 
router.get('/user', auth, (req, res)=>{
  console.log(req.user);
  User.findById(req.user.id).select('-password').then(user =>{
    res.json(user);
  })
});


module.exports = router;