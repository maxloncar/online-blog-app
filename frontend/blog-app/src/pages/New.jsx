import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../context/Context";

export default function New() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBlogPost = {
      username: user.username,
      title,
      description,
    };

    // if file (image) exist
    if (file) {
      const data = new FormData();
      // date is used in the name of the file so user
      // can't upload different image with the same name
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newBlogPost.image = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.post("/posts", newBlogPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new">
      {file && (
        <img
          src={URL.createObjectURL(file)}
          alt="New blog"
          className="new__image"
        />
      )}
      <form className="new__form" onSubmit={handleSubmit}>
        <div className="new__group">
          <label htmlFor="input__file">
            <i className="new__icon fa-solid fa-circle-plus"></i>
          </label>
          <input
            type="file"
            id="input__file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Blog title"
            className="new__input new__input-title"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="new__group">
          <textarea
            placeholder="Write your story..."
            type="text"
            className="new__input new__input-description"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button className="new__button" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
