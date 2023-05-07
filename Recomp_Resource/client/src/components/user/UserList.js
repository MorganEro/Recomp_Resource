import React, { useEffect, useState } from "react";
import { getAllUsers, getUserSearch } from "../../modules/userManager";
import User from "./User";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchParams, setSearchParams] = useState("");

  const getUsers = () => {
    getAllUsers().then((data) => setUsers(data));
  };

  useEffect(() => {
    getUsers();
  }, []);

  const search = () => {
    getUserSearch(searchParams).then((searchResults) => {
      setUsers(searchResults);
      setSearchParams("")
    });
  };

  return (
    <>
      <div className="container m-4">
        <div className="search-wrapper">
          <label htmlFor="search-form">
            <input
              type="search"
              name="search-form"
              id="search-form"
              className="searchInput rounded"
              placeholder="DisplayName/Focus..."
              onChange={(event) => {
                setSearchParams(event.target.value);
              }}
            />
          </label>
          <button onClick={search}>Search </button>
        </div>
      </div>
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
