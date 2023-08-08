import React, { useEffect, useState } from "react";

import {
  getAllResourcesByCategoryId,
  getAllResourcesSavedByUserId,
  getResourceSearch,
} from "../../modules/resourceManager";
import UserResource from "./UserResource";
import SavedResource from "./SavedResource";
import ScrollToTop from "../Utilities/ScrollToTop";
import Search from "../Utilities/Search";

const UserResourceList = () => {
  const [resources, setResources] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [savedResources, setSavedResources] = useState([]);
  const [searchParams, setSearchParams] = useState("");
  const searchPlaceholder = "Title or Focus";
  const getResources = () => {
    getAllResourcesByCategoryId().then((data) => setResources(data));
    setSearchResults([]);
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

  const search = (e) => {
    e.preventDefault();
    getResourceSearch(searchParams).then((searchResults) => {
      setSearchResults(searchResults);
      setSearchParams("");
    });
  };

  return (
    <div className="container-fluid mb-3">
      <ScrollToTop />
      <div className="container-fluid mb-5">
        {/*--------------search and filter all -------------*/}
        <Search
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          search={search}
          getterFunction={getResources}
          searchPlaceholder={searchPlaceholder}
        />
      </div>
      {/*--------------Heading-------------*/}
      <h1 className="text-center mb-4"> RESOURCES </h1>
      <div className="container text-center">
        <div className="row  justify-content-between">
          {/*--------------Goal Resource List-------------*/}
          <div className="col-6 justify-content-center">
            <h2> Goal Resources</h2>
            <div className="scroll-container">
              <div className="scroll-content">
                {searchResults.length > 0
                  ? searchResults.map((resource) => (
                      <div
                        className="d-flex flex-column mt-3 shadow-sm"
                        key={resource.id}
                      >
                        <UserResource resource={resource} />
                      </div>
                    ))
                  : resources.map((resource) => (
                      <div
                        className="d-flex flex-column mt-3 shadow-sm"
                        key={resource.id}
                      >
                        <UserResource resource={resource} key={resource.id} />
                      </div>
                    ))}
              </div>
            </div>
          </div>
          {/*--------------Saved Resource List-------------*/}
          <div className="col-6 justify-content-center">
            <h2>Saved Resources</h2>
            <div className="scroll-container">
              <div className="scroll-content">
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
      </div>
    </div>
  );
};

export default UserResourceList;
