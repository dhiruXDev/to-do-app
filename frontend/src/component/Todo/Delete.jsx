import React, { useEffect, useState } from "react";
import {Button} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { getUserToken } from '../../helper/token';
import { API_BASE_URL } from '../../config';

export default function Edit({ deleteId, open, close }) {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    close();
    setShow(false);
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (open) {
      setShow(true);
    }
  }, [open]);

  const handleOnUpdate = (event) => {
    event.preventDefault();
    fetch(`${API_BASE_URL}/todo/${deleteId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `${getUserToken()}`, 
        }
      })
        .then(() => {
            handleClose() 
        });
  }
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <p> Are you sure want to delete?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleOnUpdate}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
