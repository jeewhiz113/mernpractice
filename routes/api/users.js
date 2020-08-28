//everything in this file returns json

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');  //need the jwt secret
const jwt = require('jsonwebtoken'); //need jwt
//bring in item model

const User = require('../../models/User');

//@route Post api/users: 
//@desc Register new user
//@access Public  (note we are using router, so we have router.get and not app.get)
router.post('/', (req, res)=>{
  const { name, email, password } = req.body;  //pull out these properties from the body of the post request.
  if (!name || !email || !password){
    return res.status(400).json({msg: "Please enter all fields."});  //400 means its a bad request
  }

  User.findOne({email: email})  //find the email that matches
    .then(user =>{
      if (user){  //user is either null or a user exists
        return res.status(400).json({msg: "User already exists."});
      };
      const newUser = new User({
        name: name,
        email: email,
        password: password
      });
      //Create salt and hash
      bcrypt.genSalt(10, (err, salt)=>{  //generate a salt
        bcrypt.hash(newUser.password, salt, (err, hash)=>{ //callback that takes such salt and theuser password and hash such pw.
          if (err) throw err;  //then callback that takes such hash pw and assign it to newUser password.
          newUser.password = hash;
          newUser.save()
            .then(user =>{ 
              //what is this actually doing?
              jwt.sign( //we put information in here to code the web token.
                {
                  id: user.id,
                  name:user.name
                },
                config.get('jwtSecret'),
                {expiresIn: 3600}, (err, token)=>{
                  if (err) throw err;
                  res.json({
                    token: token,  //send the token along with the user to the browser.
                    user:{
                      id: user.id,
                      name: user.name,
                      email: user.email
                    }
                  })
                }
              )
            });
        })
      })
    })
  
})  //Note the end point is api/item here because of how we defined it.

module.exports = router;