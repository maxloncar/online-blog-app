import BlogPost from "./BlogPost";

export default function BlogPosts({ blogPosts }) {
  return (
    <div className="blog-posts">
      {blogPosts.map((blogPost) => (
        <BlogPost blogPost={blogPost} key={blogPost._id} />
      ))}
    </div>
  );
}
