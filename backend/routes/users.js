const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

// bcrypt library for hashing the password
const bcrypt = require("bcrypt");

// UPDATE
router.put("/:id", async (req, res) => {
  // check if the user is owner of the account
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      // generate a salt and hash
      // a salt with 10 hashes per second (10 rounds)
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          // set new proeprties inside request and body
          $set: req.body,
        },
        // send the new user
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can only update your account!");
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  // check if the user is owner of the account
  if (req.body.userId === req.params.id || req.body.isAdmin === true) {
    const user = await User.findById(req.params.id);
    // check if user exists
    if (user) {
      try {
        // delete blog posts of the deleted user
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted!");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(404).json("User not found!");
    }
  } else {
    res.status(401).json("You can only delete your account!");
  }
});

// GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    // send all info except the password
    const { password, ...otherCredentials } = user._doc;
    res.status(200).json(otherCredentials);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL USERS
router.get("/", async (req, res) => {
  try {
    let users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
