import React, { useEffect, useState } from "react";
import { getAllResources, getResourceSearch } from "../../modules/resourceManager";
import Resource from "./Resource";
import { Link } from "react-router-dom";


const AdminResourceList = () => {
  const [resources, setResources] =  useState([])
  const [searchParams, setSearchParams] = useState("");


 


  const getResources = () => {
    getAllResources().then((data) => setResources(data));
  };

  useEffect(() => {
    getResources();
  }, []);

  const search = () => {
    getResourceSearch(searchParams).then((searchResults) => {
      setResources(searchResults);
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
      <h1 className="text-center"> RESOURCES</h1>
      <button>
      <Link to={"../../resource/create"}>ADD</Link>
      </button>
      <section className="container">
        <div className="row justify-content-center">
          {resources.map((resource) => (
            <Resource resource={resource} key={resource.id} />
          ))}
        </div>
      </section>
    </>
  );
};

export default AdminResourceList;
