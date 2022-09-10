import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get("/categories");
      setCategories(res.data);
    };
    getCategories();
  }, []);

  const handleSocialMedia = async (link) => {
    window.open(link + window.location.href, "_blank");
  };

  const handleCopyClipboard = async () => {
    navigator.clipboard.writeText(window.location.href);
    setMessage(true);
    setTimeout(() => {
      setMessage(false);
    }, 2000);
  };

  return (
    <div className="sidebar">
      <div className="sidebar__item">
        <h3 className="sidebar__title">ABOUT</h3>
        <img
          className="sidebar__image"
          src="https://www.expandgh.com/wp-content/uploads/2017/11/blog-1.jpg"
          alt="Blog"
        />
        <p className="sidebar__text">
          This Online Blog application is created for Graduation thesis.
        </p>
      </div>
      <div className="sidebar__item">
        <h3 className="sidebar__title">CATEGORIES</h3>
        <ul className="sidebar__list">
          {categories.map((category) => (
            <Link
              to={`/?category=${category.name}`}
              className="link"
              key={category._id}
            >
              <li className="sidebar__list-item">{category.label}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebar__item">
        <h3 className="sidebar__title">SHARE</h3>
        <div className="sidebar__socials">
          <i
            className="sidebar__social fa-brands fa-facebook"
            onClick={() =>
              handleSocialMedia("https://www.facebook.com/sharer/sharer.php?u=")
            }
          ></i>
          <i
            className="sidebar__social fa-brands fa-linkedin"
            onClick={() =>
              handleSocialMedia(
                "https://www.linkedin.com/shareArticle?mini=true&url="
              )
            }
          ></i>
          <i
            className="sidebar__social fa-solid fa-link"
            onClick={() => handleCopyClipboard()}
          ></i>
        </div>
        {message && <p className="sidebar__message">Copied link!</p>}
      </div>
    </div>
  );
}
