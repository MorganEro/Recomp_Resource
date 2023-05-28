import React, { useEffect, useState } from "react";
import {
  getAllResources,
  getResourceSearch,
} from "../../modules/resourceManager";
import AdminResource from "./AdminResource";
import { Button, Input, InputGroup, Modal, ModalBody } from "reactstrap";
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
    <>
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
      <h1 className="text-center"> RESOURCES</h1>
      <Button
        size="sm"
        outline
        className="mx-5"
        color="primary"
        onClick={sortButtonDate}
      >
        Oldest First
      </Button>
      <Button
        size="sm"
        outline
        color="primary"
        className="mx-5"
        onClick={sortButtonMostSaves}
      >
        Most Saves
      </Button>

      <Button size="sm" className="mx-5" onClick={toggle}>
        ADD
        <Modal isOpen={modal} toggle={toggle}>
          <ModalBody>
            <AddResource toggle={toggle} />
          </ModalBody>
        </Modal>
      </Button>

      <section className="container">
        <div>
          {resources.map((resource) => (
            <div className="d-flex flex-column mt-3" key={resource.id}>
              <AdminResource resource={resource} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default AdminResourceList;
