import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../modules/userManager";
import User from "./User";

const UserList = () => {
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    getAllUsers().then((users) => setUsers(users));
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
    <h1 className="text-center"> MEMBERS</h1>
      <section className="container">
        <div className="row justify-content-center">
          {users.map((user) => (
            <User user={user} key={user.id} />
          ))}
        </div>
      </section>
    </>
  );
};

export default UserList;
