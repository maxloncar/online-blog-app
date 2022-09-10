import { useState } from "react";
import BlogPost from "./BlogPost";

export default function BlogPosts({ blogPosts }) {
  const [searchTerm, setSearchTerm] = useState("");

  // filtering blog posts by search term
  let filteredBlogPosts = blogPosts.filter((item) => {
    return Object.keys(item).some((key) =>
      item[key]
        .toString()
        .toLowerCase()
        .includes(searchTerm.toString().toLowerCase())
    );
  });

  return (
    <>
      <input
        type="text"
        placeholder="&#61442;"
        className="blog-posts__input"
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <div className="blog-posts">
        {filteredBlogPosts.map((blogPost) => (
          <BlogPost blogPost={blogPost} key={blogPost._id} />
        ))}
      </div>
    </>
  );
}
