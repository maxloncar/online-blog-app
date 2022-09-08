import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get("/categories");
      setCategories(res.data);
    };
    getCategories();
  }, []);

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
          <i className="sidebar__social fa-brands fa-facebook"></i>
          <i className="sidebar__social fa-brands fa-linkedin"></i>
          <i className="sidebar__social fa-solid fa-link"></i>
        </div>
      </div>
    </div>
  );
}
