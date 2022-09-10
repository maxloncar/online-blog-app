const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const commentRoute = require("./routes/comments");

// library for uploading files (images)
const multer = require("multer");

//library for using public folder
const path = require("path");

dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// taking file and saving it to the "images" file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb - callback function which takes care of errors
    cb(null, "images");
  },
  // filename which we provide (this file is sent to the react application)
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

// uploading a single file
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded!");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/comments", commentRoute);

app.listen("5000", () => {
  console.log("Backend is running!");
});
