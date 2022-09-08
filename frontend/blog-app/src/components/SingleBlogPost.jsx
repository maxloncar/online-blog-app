import { useEffect } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context/Context";

export default function SingleBlogPost() {
  const location = useLocation();

  // get the id from the pathname
  const path = location.pathname.split("/")[2];
  const [blogPost, setBlogPost] = useState({});
  const publicFolder = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    // get the data from the blog post
    const getBlogPost = async () => {
      const res = await axios.get("/posts/" + path);
      setBlogPost(res.data);
      setTitle(res.data.title);
      setDescription(res.data.description);
    };
    getBlogPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${blogPost._id}`, {
        data: { username: user.username, isAdmin: user.isAdmin },
      });
      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${blogPost._id}`, {
        username: user.username,
        isAdmin: user.isAdmin,
        title,
        description,
      });
      setUpdateMode(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="single-blog-post">
      <div className="single-blog-post__wrapper">
        {blogPost.image ? (
          <img
            src={publicFolder + blogPost.image}
            alt="Blog Post"
            className="single-blog-post__image"
          />
        ) : (
          <img
            src="https://media.istockphoto.com/photos/the-word-blog-arranged-from-wooden-blocks-placed-on-a-white-computer-picture-id1338011657?b=1&k=20&m=1338011657&s=170667a&w=0&h=QxvXC8F7nKbux4YekofifQ3cvucJuLVtXaGdxu6ZLHU="
            alt="Blog Post"
            className="single-blog-post__image"
          />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="single-blog-post__title-input"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="single-blog-post__title">
            {title}
            {(blogPost.username === user?.username || user.isAdmin) && (
              <div className="single-blog-post__actions">
                <i
                  className="single-blog-post__icon fa-solid fa-pen-to-square"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="single-blog-post__icon fa-solid fa-trash-can"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="single-blog-post__info">
          <p className="single-blog-post__author">
            Author:
            <Link to={`/?user=${blogPost.username}`} className="link">
              <span className="single-blog-post__author--bolded">
                {" "}
                {blogPost.username}
              </span>
            </Link>
          </p>
          <p className="single-blog-post__date">
            {new Date(blogPost.createdAt).toDateString()}
          </p>
        </div>
        {updateMode ? (
          <textarea
            className="single-blog-post__description-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        ) : (
          <p className="single-blog-post__description">{description}</p>
        )}
        {updateMode && (
          <button className="single-blog-post__button" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
