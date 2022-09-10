import axios from "axios";

export default function User({ user }) {
  const publicFolder = "http://localhost:5000/images/";

  const handleDelete = async () => {
    try {
      await axios.delete(`/users/${user._id}`, {
        data: { username: user.username, userId: user._id },
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {!user.isAdmin ? (
        <div className="user">
          <img
            className="user__image"
            src={publicFolder + user.image}
            alt="User"
          />
          <div className="user__info">
            <h2 className="user__data">
              {user.firstname} {user.lastname}
            </h2>
            <p className="user__data">{user.username}</p>
            <p className="user__data">{user.email}</p>
            <button className="user__button" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
