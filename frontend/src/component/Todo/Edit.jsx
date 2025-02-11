import React, { useEffect, useState } from "react";
import {Button} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { getUserToken } from '../../helper/token';
import { API_BASE_URL } from '../../config';

export default function Edit({ data, open, close }) {
  const [show, setShow] = useState(false);
const [title, setTitle] = useState('');
  const handleClose = () => {
    close();
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  }
  useEffect(() => {
    console.log(data)
    if (open) {
      setShow(true);
      setTitle(data.title);
    }
  }, [open]);

  const handleOnUpdate = (event) => {
    event.preventDefault();
    fetch(`${API_BASE_URL}/todo/`+data.item_id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${getUserToken()}`,
      },
      body: JSON.stringify({ title: title })
    })
      .then(response => response.json())
      .then(data => {
        handleClose()
        // setTasks([...tasks, data]);
      });
  }
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Edit your Task below</Form.Label>
              <Form.Control as="textarea" value={title ? title : ''} rows={3} onChange={onChangeTitle}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleOnUpdate}>
            Update Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
