import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, ModalBody } from "reactstrap";
import Search from "../Utilities/Search";
import {
  getAllResources,
  getResourceSearch,
} from "../../modules/resourceManager";
import AdminResource from "./AdminResource";
import AddResource from "./AddResource";
import ScrollToTop from "../Utilities/ScrollToTop";

const AdminResourceList = () => {
  const [resources, setResources] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams, setSearchParams] = useState("");
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const navigate = useNavigate();
  const searchPlaceholder = "Title or Focus";

  const getResources = () => {
    getAllResources().then((data) => setResources(data));
    setSearchResults([]);
  };

  // useEffect(() => {
  //   getResources();
  // }, []);

  const handleResourceClick = (resourceId) => {
    sessionStorage.setItem("scrollPosition", window.scrollY);
    navigate(`../../resource/adminDetails/${resourceId}`);
  };

  useEffect(() => {
    getResources();
    const lastScrollPosition = sessionStorage.getItem("scrollPosition");
    if (lastScrollPosition !== null) {
      window.scrollTo(0, parseInt(lastScrollPosition, 10));
    }
  }, [navigate]);

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
      <ScrollToTop />
      {/* ------------search bar-------------------- */}
      <Search
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        search={search}
        getterFunction={getResources}
        searchPlaceholder={searchPlaceholder}
      />

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
