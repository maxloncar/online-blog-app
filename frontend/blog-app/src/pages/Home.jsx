import { useEffect } from "react";
import { useState } from "react";
import BlogPosts from "../components/BlogPosts";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Home() {
  const [blogPosts, setBlogPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchBlogPosts = async () => {
      // promise based HTTP client -> axios
      const res = await axios.get("/posts" + search);
      setBlogPosts(res.data);
    };
    fetchBlogPosts();
  }, [search]);

  return (
    <>
      <Header />
      <div className="home">
        <BlogPosts blogPosts={blogPosts} />
        <Sidebar />
      </div>
    </>
  );
}
