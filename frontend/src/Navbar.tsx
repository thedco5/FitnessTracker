import {useState} from "react";
import { Link } from 'react-router-dom';
import Modal from "./Modal.tsx";
import './Navbar.css';

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/">Home</Link>
          <Link to="/exercise">Exercise</Link>
        </div>
        <div className="navbar-right">
          <button className="sign-in-button" onClick={handleShow}>Sign In</button>
        </div>
      </nav>
      <Modal show={showModal} handleClose={handleClose} />
    </>
  );
};

export default Navbar;
