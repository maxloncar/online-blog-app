import logo from "../images/logo.PNG";
import default_user from "../images/default-user.jpg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context/Context";

export default function Navigation() {
  const { user, dispatch } = useContext(Context);
  const publicFolder = "http://localhost:5000/images/";

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="navigation">
      <div className="navigation__left">
        <img
          className="navigation__left-logo"
          src={logo}
          alt="Online blog logo"
        />
      </div>
      <div className="navigation__center" />
      <div className="navigation__right">
        <ul className="navigation__right-list">
          <li className="navigation__right-list-item">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          {user ? (
            <li className="navigation__right-list-item">
              {user.isAdmin ? (
                <Link className="link" to="/users">
                  USERS
                </Link>
              ) : (
                ""
              )}
            </li>
          ) : (
            ""
          )}

          <li className="navigation__right-list-item">
            <Link className="link" to="/new">
              NEW BLOG
            </Link>
          </li>
          {user ? (
            <li className="navigation__right-list-item" onClick={handleLogout}>
              <Link className="link" to="/login">
                LOGOUT
              </Link>
            </li>
          ) : (
            ""
          )}
        </ul>
        {user ? (
          <Link to="/settings">
            {user.image ? (
              <img
                className="navigation__right-image"
                src={publicFolder + user.image}
                alt="User"
              />
            ) : (
              <img
                className="navigation__right-image"
                src={default_user}
                alt="User"
              />
            )}
          </Link>
        ) : (
          <ul className="navigation__right-list">
            <li className="navigation__right-list-item">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="navigation__right-list-item">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
