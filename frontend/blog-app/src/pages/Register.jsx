import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const res = await axios.post("/auth/register", {
        username,
        firstname,
        lastname,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      if (err.response.data.message) {
        setError("User validation failed!");
      } else if (err.response.data.keyValue.username) {
        setError("Username already in use!");
      } else if (err.response.data.keyValue.email) {
        setError("Email already in use!");
      }
    }
  };

  return (
    <div className="register">
      <h1 className="register__title">Register</h1>
      <form className="register__form" onSubmit={handleSubmit}>
        <label>First name</label>
        <input
          type="text"
          className="register__input"
          placeholder="Enter your first name..."
          onChange={(e) => setFirstname(e.target.value)}
          required
        />
        <label>Last name</label>
        <input
          type="text"
          className="register__input"
          placeholder="Enter your last name..."
          onChange={(e) => setLastname(e.target.value)}
          required
        />
        <label>Username</label>
        <input
          type="text"
          className="register__input"
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Email</label>
        <input
          type="text"
          className="register__input"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          className="register__input"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="danger">{error}</p>}
        <button className="register__button" type="submit">
          Register
        </button>
        <p className="register__need-account">
          Already have an account?{" "}
          <span>
            <Link className="link" to="/login">
              Login here
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
}
