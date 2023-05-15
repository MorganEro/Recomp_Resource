import React, { useState } from "react";

import { DeleteQuote } from "../../modules/quoteManager";
import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import QuoteEdit from "./QuoteEdit";

const Quote = ({ quote, getQuotes }) => {
  const [modal, setModalQ] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const toggleQ = () => setModalQ(!modal);
  const deleteToggle = () => setDeleteModal(!modal);

  const handleDeleteButtonClick = () => {
    DeleteQuote(quote.id).then(() => {
      getQuotes()
    })
   
  };
  const handleCancelButtonClick = () => {
    setDeleteModal(false);
   }

  return (
    <Card>
      <CardBody >
        <p>{quote.content}</p>
        <Button outline color="primary" className="mx-5"  onClick={toggleQ}>
          Edit
          <Modal isOpen={modal} toggle={toggleQ}>
            <ModalBody>
              <QuoteEdit quoteId={quote.id} toggle={toggleQ} />
            </ModalBody>
          </Modal>
        </Button>
        <Button outline size="sm" color="danger"  className="mx-5"  onClick={deleteToggle}>
          Delete
        </Button>
        <Modal isOpen={deleteModal} toggle={deleteToggle}>
          <ModalBody>
            You are about to delete a motivational quote. Are you sure?
          </ModalBody>
          <ModalFooter>
            <Button className= "mx-5" onClick={handleCancelButtonClick}>Cancel</Button>
            <Button className= "mx-5" color="danger" onClick={handleDeleteButtonClick}>
              Delete
            </Button>
          </ModalFooter>
        </Modal>
      </CardBody>
    </Card>
  );
};

export default Quote;
