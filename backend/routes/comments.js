const router = require("express").Router();
const Comment = require("../models/Comment");

// CREATE NEW COMMENT
router.post("/", async (req, res) => {
  const newComment = new Comment(req.body);
  try {
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE COMMENT
router.delete("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    // check if it is user's comment or if it's admin
    if (comment.username === req.body.username || req.body.isAdmin === true) {
      try {
        await comment.delete();
        res.status(200).json("Comment has been deleted!");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can only delete your own comment!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL COMMENTS
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
  //}
});

module.exports = router;
