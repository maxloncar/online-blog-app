const router = require("express").Router();
const Post = require("../models/Post");

// CREATE NEW BLOG POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE BLOG POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // check if it is user's post
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            // set new proeprties inside request and body
            $set: req.body,
          },
          // send the new user
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can only update your blog post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE BLOG POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // check if it is user's post
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Blog post has been deleted!");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can only delete your blog post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET BLOG POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL BLOG POSTS
router.get("/", async (req, res) => {
  // queries inside URL (for example ?user=john, ?category=music)
  const username = req.query.user;
  const categoryName = req.query.category;

  try {
    let posts;
    if (username) {
      // get all blog posts which are written by this username
      posts = await Post.find({ username });
    } else if (categoryName) {
      posts = await Post.find({
        categories: {
          // check if categoryName is inside categories array
          $in: [categoryName],
        },
      });
    } else {
      // get all posts
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
