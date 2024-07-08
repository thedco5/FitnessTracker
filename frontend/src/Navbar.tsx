import {useState, useEffect, useRef, ChangeEvent, MouseEvent} from 'react';
import {Link, useLocation} from 'react-router-dom';
import Modal from './Modal';
import './Navbar.css';

interface NavbarProps {
  isSignedIn: boolean;
  setIsSignedIn: (isSignedIn: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({isSignedIn, setIsSignedIn}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [profilePic, setProfilePic] = useState<string>('src/images/image.jpg');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const handleShow = () => {
    setShowModal(true);
    setShowDropdown(false);
  };

  const handleClose = () => setShowModal(false);

  const toggleDropdown = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowDropdown(prevShowDropdown => !prevShowDropdown);
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    setShowDropdown(false);
  };

  const handleSignIn = () => {
    setIsSignedIn(true);
    setShowDropdown(false);
  };

  const handleProfilePicChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside as EventListener);
    document.addEventListener('touchstart', handleClickOutside as EventListener);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside as EventListener);
      document.removeEventListener('touchstart', handleClickOutside as EventListener);
    };
  }, []);

  useEffect(() => {
    setShowDropdown(false);
  }, [location]);

  return (
    <div style={{backgroundColor: '#282c34'}}>
      <div className="main-wrapper">
        <div className="navbar">
          <div className="navbar-left">
            <Link to="/">Home</Link>
            <Link to="/workouts">Workouts</Link>
            <Link to="/exercises">Exercises</Link>
          </div>
          <div className="navbar-right">
            {isSignedIn ? (
              <div className="account">
                <button className="account-button" onClick={toggleDropdown}>
                  <img src={profilePic} alt="Profile" className="profile-pic"/>
                </button>
                {showDropdown && (
                  <div className="dropdown-menu" ref={dropdownRef}>
                    <div className="profile-header">
                      <img src={profilePic} alt="Profile" className="profile-pic"/>
                      <label className="change-pic-icon">
                        +
                        <input type="file" accept="image/*" onChange={handleProfilePicChange}/>
                      </label>
                    </div>
                    <div className="profile-details">
                      <p>Username: Smetkata</p>
                      <p>Email: andonov@gmail.com</p>
                      <button onClick={handleSignOut}>Sign Out</button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button className="sign-in-button" onClick={handleShow}>Sign In</button>
            )}
          </div>
        </div>
      </div>
      <Modal show={showModal} handleClose={handleClose} setIsSignedIn={handleSignIn}/>
    </div>
  );
};

export default Navbar;
