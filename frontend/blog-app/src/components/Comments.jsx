import Comment from "../components/Comment";

export default function Comments({ comments, blogPost, setToggle }) {
  return (
    <div className="comments">
      {comments.map(
        (comment) =>
          comment.postId === blogPost._id && (
            <Comment
              key={comment._id}
              comment={comment}
              setToggle={setToggle}
            />
          )
      )}
    </div>
  );
}
