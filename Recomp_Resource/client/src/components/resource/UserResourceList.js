import React, { useEffect, useState } from "react";

import {
  getAllResourcesByCategoryId,
  getAllResourcesSavedByUserId,
  getResourceSearch,
} from "../../modules/resourceManager";
import UserResource from "./UserResource";
import SavedResource from "./SavedResource";
import {
  Button,
  CardBody,
  CardGroup,
  CardTitle,
  Input,
  InputGroup,
} from "reactstrap";

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
    <CardGroup>
      
        <div className="container m-4">
          <InputGroup className="search-wrapper">
            <Button outline size="sm" color="secondary" onClick={getResources}>
              Show All
            </Button>
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
            <Button outline size="sm" color="secondary" onClick={search}>
              <i className="fa fa-search fa-lg"></i>
            </Button>
          </InputGroup>
        </div>
      
      <CardBody>
        <CardTitle>
          <h1 className="text-center"> RESOURCES</h1>
        </CardTitle>
        <section className="container">
          <div className="row">
            <div className="col justify-content-center">
              <h2> Current Goal Resources</h2>
              {resources.map((resource) => (
                <div className="d-flex flex-column mt-3" key={resource.id}>
                  <UserResource resource={resource} key={resource.id} />
                </div>
              ))}
            </div>
            <div className="col justify-content-center">
              <h2>Saved Resources</h2>
              {savedResources?.map((savedResource) => (
                <div className="d-flex flex-column mt-3" key={savedResource.id}>
                  <SavedResource
                    savedResource={savedResource}
                    getSavedResources={getSavedResources}
                    key={savedResource.id}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </CardBody>
    </CardGroup>
  );
};

export default UserResourceList;
