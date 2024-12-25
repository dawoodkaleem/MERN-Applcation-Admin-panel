import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";

export const AdminUsers = () => {
  const { authorizationToken } = useAuth();
  const [users, setUsers] = useState([]);

  const getAllUsersData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/users", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log(`users ${data}`);
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsersData();
  }, []);

  return (
    <>
      <div>
        {users.length > 0 ? (
          users.map((currUser) => (
            <h2 key={currUser.id || currUser.username}>
              {currUser.username || "Unknown User"}
            </h2>
          ))
        ) : (
          <p>No users available.</p>
        )}
      </div>
    </>
  );
};
