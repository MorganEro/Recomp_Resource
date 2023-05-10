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
    <>
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
        <button onClick={getResources}>
          Reset
        </button>
      </div>
      <h1 className="text-center"> RESOURCES</h1>
      <section className="container">
        <div className="row">
          <div className="col justify-content-center">
            <h2>Resources Based On Your Current Goal</h2>
            {resources.map((resource) => (
              <UserResource resource={resource} key={resource.id} />
            ))}
          </div>
          <div className="col justify-content-center">
            <h2>Saved Resources</h2>
            {savedResources?.map((savedResource) => (
              <SavedResource
                savedResource={savedResource}
                getSavedResources={getSavedResources}
                key={savedResource.id}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default UserResourceList;
