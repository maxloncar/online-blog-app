import axios from "axios";
import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      setError("");
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      setError(err.response.data);
    }
  };

  return (
    <div className="login">
      <h1 className="login__title">Login</h1>
      <form className="login__form" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="login__input"
          placeholder="Enter your username..."
          ref={userRef}
          required
        />
        <label>Password</label>
        <input
          type="password"
          className="login__input"
          placeholder="Enter your password..."
          autoComplete="off"
          ref={passwordRef}
          required
        />
        {error && <p className="danger">{error}</p>}
        <button className="login__button" type="submit" disabled={isFetching}>
          Login
        </button>
        <p className="login__need-account">
          Need an account?{" "}
          <span>
            <Link className="link" to="/register">
              Register here
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
}
