import { useContext } from "react";
import { Context } from "../context/Context";
import axios from "axios";

export default function Comment({ comment, setToggle }) {
  const { user } = useContext(Context);

  const handleDelete = async () => {
    try {
      await axios.delete(`/comments/${comment._id}`, {
        data: { username: user.username, isAdmin: user.isAdmin },
      });
      setToggle((prevState) => !prevState);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="comment">
      <div className="comment__info">
        <h2 className="comment__username">{comment.username}</h2>
        <p className="comment__content">{comment.content}</p>
      </div>
      <p className="comment__date">
        {new Date(comment.createdAt).toDateString()}
      </p>
      {user.username === comment.username && (
        <i
          className="comment__icon fa-solid fa-trash-can"
          onClick={handleDelete}
        ></i>
      )}
    </div>
  );
}
