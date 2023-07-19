import React, { useEffect, useState } from "react";
import {
  getAllResources,
  getResourceSearch,
} from "../../modules/resourceManager";
import AdminResource from "./AdminResource";
import { Modal, ModalBody } from "reactstrap";
import AddResource from "./AddResource";

const AdminResourceList = () => {
  const [resources, setResources] = useState([]);
  const [searchParams, setSearchParams] = useState("");
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const getResources = () => {
    getAllResources().then((data) => setResources(data));
  };

  useEffect(() => {
    getResources();
  }, []);

  const search = () => {
    getResourceSearch(searchParams).then((searchResults) => {
      setResources(searchResults);
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
      <form className="d-flex mb-5" role="search">
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
          {resources.map((resource) => (
            <div className="d-flex flex-column mt-3" key={resource.id}>
              <AdminResource resource={resource} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminResourceList;
