import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import './Navbar.css';

const Navbar = ({ isSignedIn, setIsSignedIn }) => {
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/">Home</Link>
          <Link to="/exercise">Exercise</Link>
        </div>
        <div className="navbar-right">
          {isSignedIn ? (
            <div className="account">
              <button className="account-button" onClick={toggleDropdown}>
                <img src="src\images\image.jpg" alt="Profile" className="profile-pic" />
              </button>
              {showDropdown && (
                <div className="dropdown-menu">
                  <p>Username: Smetkata</p>
                  <p>Email: andonov@gmail.com</p>
                  <button onClick={() => setIsSignedIn(false)}>Sign Out</button>
                </div>
              )}
            </div>
          ) : (
            <button className="sign-in-button" onClick={handleShow}>Sign In</button>
          )}
        </div>
      </nav>
      <Modal show={showModal} handleClose={handleClose} setIsSignedIn={setIsSignedIn} />
    </>
  );
};

export default Navbar;
