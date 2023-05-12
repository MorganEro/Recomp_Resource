import React, { useEffect, useState } from "react";
import { getAllUsers, getUserSearch } from "../../modules/userManager";
import User from "./User";
import { InputGroup, Button, Input } from "reactstrap";


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
        
      <div className="container m-4">
        <InputGroup className="search-wrapper">
          <Button outline  size="sm" color= "secondary" onClick={getUsers}>Show All</Button>
            <Input
              type="search"
              name="search-form"
              id="search-form"
              className="searchInput rounded"
              placeholder="DisplayName/Focus..."
              onChange={(event) => {
                setSearchParams(event.target.value);
              }}
            />
          <Button outline  size="sm" color= "secondary"  onClick={search}>Search </Button>
        </InputGroup>
      </div>
      </div>
      <h1 className="text-center"> MEMBERS</h1>
      <section className="container">
        <div className="row justify-content-center">
          {users.map((user) => (
            <div className="d-flex flex-column mt-3" style= {{width: "50vw"  }}key={user.id}>
            <User user={user}  />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default UserList;
