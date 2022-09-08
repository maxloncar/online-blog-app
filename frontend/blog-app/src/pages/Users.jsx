import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import User from "../components/User";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      // promise based HTTP client -> axios
      const res = await axios.get("/users/");
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="users">
      {users.map((user) => (
        <User user={user} key={user._id} />
      ))}
    </div>
  );
}
