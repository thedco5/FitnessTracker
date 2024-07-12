import { useState, useEffect, useRef, ChangeEvent, MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Modal from './Modal';
import './Navbar.css';
import { removeAccessToken } from './auth.tsx'; 
import customFetch from './api/requests.ts';

interface NavbarProps {
  isSignedIn: boolean;
  setIsSignedIn: (isSignedIn: boolean) => void;
  userInfo: { username: string; email: string; image: string | null };
  setUserInfo: (userInfo: { username: string; email: string; image: string | null }) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isSignedIn, setIsSignedIn, userInfo, setUserInfo }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
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
    removeAccessToken(); // Remove the access token on sign out
    setIsSignedIn(false);
    setUserInfo({ username: '', email: '', image: null });
    setShowDropdown(false);
    localStorage.removeItem('accessToken');
    window.location.reload();
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64String = result.replace("data:", "").replace(/^.+,/, "");
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleProfilePicChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const base64 = await convertToBase64(file);
        try {
          const accessToken = localStorage.getItem('accessToken');
          if (!accessToken)
            throw new Error('No access token available!');
          const response = await customFetch(
            '/user',
            'PATCH',
            { "image": { data: base64 } }
          )
          if (response.ok) {
            setUserInfo({ ...userInfo, image: base64 });
          } else {
            throw new Error(`Request failed: [${response.status}] ${response.statusText}`);
          }
        } catch (error) {
          console.error('Failed to update profile. ' + error);
        }

      } catch (error) {
        console.error("Error converting file to base64: ", error);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setShowDropdown(false);
  }, [location]);

  const onDivLoad = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('No access token available');
      }
      const response = await fetch('http://localhost:8080/api/user/info', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserInfo({ username: data.username, email: data.email, image: data.image?.data || null });
      } else {
        console.error('Failed to fetch user info.');
      }
    } catch (error) {
      console.error('Failed to fetch user info. ' + error);
    }
  }

  const decodeBase64Image = (base64: string | null): string => {
    return base64 ? `data:image/jpeg;base64,${base64}` : 'src/images/image.jpg';
  };

  return (
    <div style={{ backgroundColor: '#282c34' }}>
      <div className="main-wrapper">
        <nav className="navbar">
          <div className="navbar-left">
            <Link to="/workouts">Workouts</Link>
            <Link to="/exercises">Exercises</Link>
          </div>
          <div className="navbar-right">
            {isSignedIn ? (
              <div className="account" onLoad={onDivLoad}>
                <button className="account-button" onClick={toggleDropdown}>
                  <img src={decodeBase64Image(userInfo.image)} alt="Profile" className="profile-pic" />
                </button>
                {showDropdown && (
                  <div className="dropdown-menu" ref={dropdownRef}>
                    <div className="profile-header">
                      <img src={decodeBase64Image(userInfo.image)} alt="Profile" className="profile-pic" />
                      <label className="change-pic-icon">
                        +
                        <input type="file" accept="image/*" onChange={handleProfilePicChange} />
                      </label>
                    </div>
                    <div className="profile-details">
                      <p>Username: {userInfo.username}</p>
                      <p>Email: {userInfo.email}</p>
                      <button onClick={handleSignOut}>Sign Out</button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button className="sign-in-button" onClick={handleShow}>Sign In</button>
            )}
          </div>
        </nav>
        <Modal show={showModal} handleClose={handleClose} setIsSignedIn={setIsSignedIn} setUserInfo={setUserInfo} />
      </div>
    </div>
  );
};

export default Navbar;
