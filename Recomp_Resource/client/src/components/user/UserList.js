import React, { useEffect, useState } from "react";
import { getAllUsers, getUserSearch } from "../../modules/userManager";
import User from "./User";
import ScrollToTop from "../Utilities/ScrollToTop";
import Search from "../Utilities/Search";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams, setSearchParams] = useState("");
  const searchPlaceholder = "DisplayName or Focus";

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
      <ScrollToTop />
      {/* ------------search bar-------------------- */}
      <Search
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        search={search}
        getterFunction={getUsers}
        searchPlaceholder={searchPlaceholder}
      />
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
