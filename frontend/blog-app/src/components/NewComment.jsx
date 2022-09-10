import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../context/Context";
import default_user from "../images/default-user.jpg";

export const NewComment = ({ blogPost, setToggle }) => {
  const [content, setContent] = useState("");
  const { user } = useContext(Context);
  const publicFolder = "http://localhost:5000/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = {
      username: user.username,
      postId: blogPost._id,
      content,
    };
    setContent("");

    try {
      await axios.post("/comments", newComment);
      setToggle((prevState) => !prevState);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new-comment">
      {user.image ? (
        <img
          className="new-comment__image"
          src={publicFolder + user.image}
          alt="User"
        />
      ) : (
        <img className="new-comment__image" src={default_user} alt="User" />
      )}

      <form className="new-comment__form" onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your comment..."
          type="text"
          className="new-comment__content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <button className="new-comment__button" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};
