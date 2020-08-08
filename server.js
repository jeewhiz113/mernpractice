const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');  //allows us to get the request as an object in for example a post request.
const path = require('path')
const items = require('./routes/api/items');
const app = express();



//bodyparser middleware:
app.use(bodyParser.json());

//bring in the keys.js file

const db = require('./config/keys').mongoURI;

//connect to MongoDB
mongoose
  .connect(db, {useUnifiedTopology: true, useNewUrlParser: true})
  .then(()=>{
    console.log('Connected to Mongo Atlas');
  }).catch(err=>{
    console.log(err);
  });

app.use('/api/items', items);  //anything going through to /api/items will use the items variable.

//Serve static assets if in production

if (process.env.NODE_ENV === 'production'){
  //Set a static folder
  app.use(express.static('client/build'));
  //Anything else, we serve the index.html file.
  app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  });
}

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`Server started on port ${port}`));

//The above is enough to be connected to the Mongo Atlas database.