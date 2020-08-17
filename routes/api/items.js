//everything in this file returns json

const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')

//bring in item model

const Item = require('../../models/Item');

//@route GET api/item: 
//@desc Get All Items
//@access Public  (note we are using router, so we have router.get and not app.get)
router.get('/', (req, res)=>{
  Item.find({})
    .sort({date: -1})
    .then(items=>res.json(items));
})  //Note the end point is api/item here because of how we defined it.

//@route POST api/items: 
//@desc Create an item
//@access Public 
router.post('/', auth, (req, res)=>{
  const newItem = new Item({
    name:req.body.name,  //body parser allows us to do this.
  });
  newItem.save().then(item=>res.json(item));
})

//@route DELETE api/item/:id: 
//@desc Delete an item
//@access Public 
router.delete('/:id', auth, (req, res)=>{
  Item.findById(req.params.id)
    .then(item => item.remove().
    then(()=>{
      res.json({success:true}); //apparently this is how to remove the item in mongodb.
    }))
    .catch(err => res.status(404).json({success:false}));
    
})
module.exports = router;