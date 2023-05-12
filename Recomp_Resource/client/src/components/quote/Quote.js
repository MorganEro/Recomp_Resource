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
import { useNavigate } from "react-router-dom";

const Quote = ({ quote, getQuotes }) => {
  const [modal, setModalQ] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const toggleQ = () => setModalQ(!modal);
  const deleteToggle = () => setDeleteModal(!modal);
  const navigate = useNavigate();

  const DeleteButton = () => {
    DeleteQuote(quote.id).then(() => {
      getQuotes()
    })
   
  };

  const handleCancelButtonClick = () => {
      deleteToggle() 
  };

  return (
    <Card>
      <CardBody >
        <p>{quote.content}</p>
        <Button outline color="primary" className="mx-5"  onClick={toggleQ}>
          Edit
          <Modal isOpen={modal} toggleQ={toggleQ}>
            <ModalBody>
              <QuoteEdit toggleQ={toggleQ} />
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
            <Button onClick={handleCancelButtonClick}>Cancel</Button>
            <Button color="danger" onClick={DeleteButton}>
              Delete
            </Button>
          </ModalFooter>
        </Modal>
      </CardBody>
    </Card>
  );
};

export default Quote;
