const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("./../middleware/auth");
const User = require("../models/User");


router.get('/list', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const shoppinglist = user.shoppinglist;
        res.json(shoppinglist);
    } catch (e) {
      res.send({ message: 'Error in Fetching user' });
    }
  });


router.post('/add', auth, async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const newItem = req.query.item;
      user.shoppinglist.push(newItem);
      await user.save();
      res.json(user.shoppinglist);
    } catch (e) {
      res.send({ message: 'Error in Fetching user' });
    }
  })
  

router.delete('/delete', auth, async (req, res) => {
    try {

    const user = await User.findById(req.user.id);
    const itemToDelete = req.query.item;
    user.shoppinglist.pull(itemToDelete);
    await user.save();
    res.json(user.shoppinglist);

    } catch (e) { 
        
        res.send({ message: 'Error in Fetching user' });
    }
})
  


module.exports = router;



