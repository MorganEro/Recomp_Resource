import React, { useEffect, useState } from "react";
import { getAllUsers, getUserSearch } from "../../modules/userManager";
import User from "./User";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams, setSearchParams] = useState("");

  const getUsers = () => {
    getAllUsers().then((data) => setUsers(data));
    setSearchResults([]);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const search = (e) => {
    e.preventDefault();
    getUserSearch(searchParams).then((searchResults) => {
      setSearchResults(searchResults);
      setSearchParams("");
    });
  };

  return (
    <div className="container d-flex flex-column">
      {/* ------------search bar-------------------- */}
      <form onSubmit={search} className="d-flex mb-5" role="search">
        <button className="btn btn-dark" onClick={getUsers}>
          All
        </button>
        <input
          type="search"
          id="search-form"
          className="form-control mx-2"
          value={searchParams}
          placeholder="DisplayName/Focus..."
          onChange={(event) => {
            setSearchParams(event.target.value);
          }}
        />
        <button type="submit" className="btn btn-secondary" onClick={search}>
          <i className="fa fa-search fa-lg"></i>
        </button>
      </form>
      <div className="container d-flex flex-column align-items-center">
        {/* ------------Heading-------------------- */}
        <h1 className="text-center"> MEMBERS</h1>

        {/* ------------Member list-------------------- */}
        {searchResults.length > 0
          ? // Display search results if there are any
            searchResults.map((user) => (
              <div
                className="d-flex m-3"
                style={{ width: "80vw" }}
                key={user.id}
              >
                <User user={user} />
              </div>
            ))
          : users.map((user) => (
              <div
                className="d-flex m-3"
                style={{ width: "80vw" }}
                key={user.id}
              >
                <User user={user} />
              </div>
            ))}
      </div>
    </div>
  );
};

export default UserList;
