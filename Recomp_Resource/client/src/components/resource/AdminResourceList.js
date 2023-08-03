import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, ModalBody } from "reactstrap";
import {
  getAllResources,
  getResourceSearch,
} from "../../modules/resourceManager";
import AdminResource from "./AdminResource";
import AddResource from "./AddResource";

const AdminResourceList = () => {
  const [resources, setResources] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams, setSearchParams] = useState("");
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const navigate = useNavigate();

  const getResources = () => {
    getAllResources().then((data) => setResources(data));
    setSearchResults([]);
  };

  // Function to handle clicking on a resource
  const handleResourceClick = (resourceId) => {
    sessionStorage.setItem("scrollPosition", window.scrollY); // Store the current scroll position
    navigate(`../../resource/adminDetails/${resourceId}`); // Navigate to the resource details page
  };

  useEffect(() => {
    getResources();
    // Check if there's a previous scroll position in the history state
    const lastScrollPosition = sessionStorage.getItem("scrollPosition");
    if (lastScrollPosition !== null) {
      // Scroll to the previous position if it exists
      window.scrollTo(0, parseInt(lastScrollPosition, 10));
    }
  }, []);

  const search = (e) => {
    e.preventDefault();
    getResourceSearch(searchParams).then((searchResults) => {
      setSearchResults(searchResults);
      setSearchParams("");
    });
  };

  const sortButtonDate = () => {
    const resAsc = [...resources].sort((a, b) =>
      a.dateAdded > b.dateAdded ? 1 : -1
    );
    setResources(resAsc);
  };
  const sortButtonMostSaves = () => {
    const resSaves = [...resources].sort((a, b) =>
      a.numberOfSaves < b.numberOfSaves ? 1 : -1
    );
    setResources(resSaves);
  };

  return (
    <div className="container-fluid mb-5" style={{ width: "80vw" }}>
      {/* ------------search bar-------------------- */}
      <form onSubmit={search} className="d-flex mb-5" role="search">
        <button type="submit" className="btn btn-dark" onClick={getResources}>
          All
        </button>
        <input
          type="search"
          id="search-form"
          className="form-control mx-2"
          placeholder="DisplayName/Focus..."
          value={searchParams}
          onChange={(event) => {
            setSearchParams(event.target.value);
          }}
        />
        <button className="btn btn-secondary" onClick={search}>
          <i className="fa fa-search fa-lg"></i>
        </button>
      </form>

      {/* ------------Heading-------------------- */}
      <h1 className="text-center">
        <strong>RESOURCES</strong>{" "}
      </h1>

      {/* ------------Dropdown and Add buttons-------------------- */}
      <div className="d-flex justify-content-between">
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Sort Resources
          </button>
          <ul className="dropdown-menu">
            <li className="dropdown-item" onClick={sortButtonDate}>
              Oldest First
            </li>
            <li className="dropdown-item" onClick={sortButtonMostSaves}>
              Most Saves
            </li>
          </ul>
        </div>
        <button
          className="btn btn-outline-success mx-2"
          title="Add Resource"
          onClick={toggle}
        >
          <i className="fa fa-plus"></i>
          {/* ------------Add Modal-------------------- */}
          <Modal isOpen={modal} toggle={toggle}>
            <ModalBody>
              <AddResource toggle={toggle} />
            </ModalBody>
          </Modal>
        </button>
      </div>

      {/* ------------Resource List-------------------- */}
      <section className="container">
        <div>
          {searchResults.length > 0
            ? // Display search results if there are any
              searchResults.map((resource) => (
                <div className="d-flex flex-column mt-3" key={resource.id}>
                  <AdminResource resource={resource} />
                </div>
              ))
            : // Display all resources if there are no search results
              resources.map((resource) => (
                <div
                  onClick={() => handleResourceClick(resource.id)}
                  className="d-flex flex-column mt-3"
                  key={resource.id}
                >
                  <AdminResource resource={resource} />
                </div>
              ))}
        </div>
      </section>
    </div>
  );
};

export default AdminResourceList;
