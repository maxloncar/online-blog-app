const router = require("express").Router();
const User = require("../models/User");

// bcrypt library for hashing the password
const bcrypt = require("bcrypt");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    // generate a salt and hash
    // a salt with 10 hashes per second (10 rounds)
    const salt = await bcrypt.genSalt(10);
    console.log(req.body.password);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    // if there is no user
    !user && res.status(400).json("Wrong credentials!");

    // check passwords
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // if password doesn't match with the database
    !validPassword && res.status(400).json("Wrong credentials!");

    // send all info except the password
    const { password, ...otherCredentials } = user._doc;
    res.status(200).json(otherCredentials);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
