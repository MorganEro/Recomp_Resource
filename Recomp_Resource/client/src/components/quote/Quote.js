import React, { useState } from "react";

import { DeleteQuote } from "../../modules/quoteManager";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import QuoteEdit from "./QuoteEdit";

const Quote = ({ quote, getQuotes }) => {
  const [modal, setModalQ] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const toggleQ = () => setModalQ(!modal);
  const deleteToggle = () => setDeleteModal(!deleteModal);

  const handleDeleteButtonClick = () => {
    DeleteQuote(quote.id).then(() => {
      getQuotes();
    });
  };
  const handleCancelButtonClick = () => {
    setDeleteModal(false);
  };

  return (
    <div className="card">
      <div className="row gx-2 m-2 align-items-center">
        {/* ------------Quote Content-------------------- */}
        <div className="col-sm-6 col-md-8">
          <p>{quote.content}</p>
        </div>

        {/* ------------Quote Edit and Delete Buttons-------------------- */}
        <div className="col-sm-6 col-md-3 mx-2">
          <span className="btn btn-outline-primary m-2" onClick={toggleQ}>
            <i className="fa fa-pencil"></i>
          </span>
          <span className="btn btn-outline-danger m-2" onClick={deleteToggle}>
            <i className="fa fa-trash"></i>
          </span>
        </div>
      </div>

      {/* ------------Modals-------------------- */}
      <Modal isOpen={modal} toggle={toggleQ}>
        <ModalBody>
          <QuoteEdit quoteId={quote.id} toggle={toggleQ} />
        </ModalBody>
      </Modal>

      <Modal isOpen={deleteModal} toggle={deleteToggle}>
        <ModalBody>
          You are about to delete a motivational quote. Are you sure?
        </ModalBody>
        <ModalFooter>
          <button className="btn mx-5" onClick={handleCancelButtonClick}>
            Cancel
          </button>
          <button
            className="btn btn-danger mx-5"
            onClick={handleDeleteButtonClick}
          >
            Delete
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Quote;
