import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Modal from './Modal';
import './Navbar.css';

const Navbar = ({ isSignedIn, setIsSignedIn }) => {
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  // Close dropdown when changing the page
  useEffect(() => {
    setShowDropdown(false);
  }, [location]);

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
                <img src="src/images/image.jpg" alt="Profile" className="profile-pic" />
              </button>
              {showDropdown && (
                <div className="dropdown-menu" ref={dropdownRef}>
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
