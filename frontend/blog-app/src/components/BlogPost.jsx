import { Link } from "react-router-dom";

export default function BlogPost({ blogPost }) {
  const publicFolder = "http://localhost:5000/images/";
  return (
    <div className="blog-post">
      {blogPost.image ? (
        <img
          className="blog-post__image"
          src={publicFolder + blogPost.image}
          alt="Blog post"
        />
      ) : (
        <img
          className="blog-post__image"
          src="https://media.istockphoto.com/photos/the-word-blog-arranged-from-wooden-blocks-placed-on-a-white-computer-picture-id1338011657?b=1&k=20&m=1338011657&s=170667a&w=0&h=QxvXC8F7nKbux4YekofifQ3cvucJuLVtXaGdxu6ZLHU="
          alt="Blog post"
        />
      )}
      <div className="blog-post__info">
        <div className="blog-post__categories">
          <p className="blog-post__category">{blogPost.category}</p>
        </div>
        <p className="blog-post__date">
          {new Date(blogPost.createdAt).toDateString()}
        </p>
        <hr />
        <h2 className="blog-post__title">{blogPost.title}</h2>
        <p className="blog-post__description">{blogPost.description}</p>
        <Link to={`/post/${blogPost._id}`}>
          <button className="blog-post__button">Read more</button>
        </Link>
      </div>
    </div>
  );
}
