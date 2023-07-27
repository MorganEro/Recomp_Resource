import React, { useEffect, useState } from "react";

import {
  getAllResourcesByCategoryId,
  getAllResourcesSavedByUserId,
  getResourceSearch,
} from "../../modules/resourceManager";
import UserResource from "./UserResource";
import SavedResource from "./SavedResource";

const UserResourceList = () => {
  const [resources, setResources] = useState([]);
  const [savedResources, setSavedResources] = useState([]);
  const [searchParams, setSearchParams] = useState("");

  const getResources = () => {
    getAllResourcesByCategoryId().then((data) => setResources(data));
  };
  const getSavedResources = () => {
    getAllResourcesSavedByUserId().then((data) => setSavedResources(data));
  };

  useEffect(() => {
    getResources();
  }, []);

  useEffect(() => {
    getSavedResources();
  }, []);

  const search = () => {
    getResourceSearch(searchParams).then((searchResults) => {
      setResources(searchResults);
      setSearchParams("");
    });
  };

  return (
    <div className="container-fluid mb-3">
      <div className="container-fluid mb-5">
        {/*--------------search and filter all -------------*/}
        <form className="d-flex" role="search">
          <button className="btn btn-dark" onClick={getResources}>
            All
          </button>
          <input
            type="search"
            id="search-form"
            className="form-control mx-2"
            placeholder="DisplayName/Focus..."
            onChange={(event) => {
              setSearchParams(event.target.value);
            }}
          />
          <button className="btn btn-secondary" type="submit" onClick={search}>
            <i className="fa fa-search fa-lg"></i>
          </button>
        </form>
      </div>
      {/*--------------Heading-------------*/}
      <h1 className="text-center mb-4"> RESOURCES </h1>
      <div className="container px-4 text-center">
        <div className="row gx-5">
          {/*--------------Goal Resource List-------------*/}
          <div className="col justify-content-center">
            <h2> Goal Resources</h2>
            {resources.map((resource) => (
              <div
                className="d-flex flex-column mt-3 shadow-sm"
                key={resource.id}
              >
                <UserResource resource={resource} key={resource.id} />
              </div>
            ))}
          </div>
          {/*--------------Saved Resource List-------------*/}
          <div className="col justify-content-center">
            <h2>Saved Resources</h2>
            {savedResources?.map((savedResource) => (
              <div
                className="d-flex flex-column mt-3 shadow-sm"
                key={savedResource.id}
              >
                <SavedResource
                  savedResource={savedResource}
                  getSavedResources={getSavedResources}
                  key={savedResource.id}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserResourceList;
