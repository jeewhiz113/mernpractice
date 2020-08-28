//So we want to create this auth.js as a middleware to protect the routes, so to only give access to validated users.

const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next){  //when done with this piece of middleware, we call next to move on to the next middleware.
  //purpose is to get the token 
  const token = req.header('x-auth-token');

  //check for token:
  if (!token){
    return res.status(401).json({ msg: 'No token, authorization denied.'});
  }
  try {
    //verify token: But what is the verification process here?
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    //Note decoded is the user object (less the name property).
    req.user = decoded;  //this is needed for the other auth.js file, to set the req.user to be decoded, which is the user.
    //if verified, then move on to the next middleware
    next();
  } catch (error) {
    res.status(400).json({msg: 'Token is not valid'});
  }
}

module.exports = auth;