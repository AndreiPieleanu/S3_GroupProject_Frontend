import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Modal } from "react-bootstrap";
import {useState } from "react";
import TokenManager from "../redux/AuthAPIs/TokenManager";

export default function Logout() {
  let navigate = useNavigate();


  const [show, setShow] = useState(true);

  const handleClose = () => {setShow(false); navigate("/reportLibrary");}
  const handleShow = () => {setShow(true);}

  const handleDelete = () => {
    TokenManager.clear();
    navigate("/reportLibrary");
    window.location.reload();
  };

  const handleNo = () => {
    navigate("/reportLibrary");
  };

  return (
    <Container>
      <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Logging out..</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to logout?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleDelete}>
                    Confirm Logout
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                    Cancel
                    </Button>
                </Modal.Footer>
      </Modal>
    </Container>
  );
}