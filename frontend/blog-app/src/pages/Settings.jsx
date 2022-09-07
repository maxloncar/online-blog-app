import { useContext, useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Context } from "../context/Context";
import default_user from "../images/default-user.jpg";
import axios from "axios";

export default function Settings() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const { user, dispatch } = useContext(Context);
  const publicFolder = "http://localhost:5000/images/";

  useEffect(() => {
    // get the data from the blog post
    const getSettings = async () => {
      const res = await axios.get("/users/" + user._id);
      setFirstname(res.data.firstname);
      setLastname(res.data.lastname);
      setEmail(res.data.email);
      setPassword(res.data.password);
    };
    getSettings();
  }, [user._id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      firstname,
      lastname,
      email,
      password,
    };

    // if file (image) exist
    if (file) {
      const data = new FormData();
      // date is used in the name of the file so user
      // can't upload different image with the same name
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.image = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  return (
    <div className="settings">
      <div className="settings__wrapper">
        <h1 className="settings__title">Update Your Account</h1>
        <form className="settings__form" onSubmit={handleUpdate}>
          <label>Profile Image</label>
          <div className="settings__profile">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : publicFolder + user.image || default_user
              }
              alt="User"
              className="settings__image"
            />
            <label htmlFor="input__file">
              <i className="settings__icon fa-solid fa-upload"></i>
            </label>
            <input
              type="file"
              id="input__file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>First name</label>
          <input
            type="text"
            value={firstname}
            className="settings__input"
            onChange={(e) => setFirstname(e.target.value)}
          />
          <label>Last name</label>
          <input
            type="text"
            value={lastname}
            className="settings__input"
            onChange={(e) => setLastname(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            value={email}
            className="settings__input"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            className="settings__input"
            autoComplete="on"
            onChange={(e) => setPassword(e.target.value)}
          />
          {success && <p className="success">Your profile has been updated!</p>}
          <button className="settings__button" type="submit">
            Update
          </button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
