import React, { useState, useEffect, FormEvent } from 'react';
import './Modal.css';

interface ModalProps {
  show: boolean;
  handleClose: () => void;
  setIsSignedIn: (isSignedIn: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ show, handleClose, setIsSignedIn }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const [emailOrUsername, setEmailOrUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [gender, setGender] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/public/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          "username" : emailOrUsername, 
          "password" : password 
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token; 
        await fetchUserInfo(token); 
        setIsSignedIn(true);
        handleClose();
        console.log("Logged in.");
      } else {
        setError('Sign-in failed. Please check your credentials.');
      }
    } catch (error) {
      setError('Sign-in failed. Please try again later. ' + error);
    }
  };

  const fetchUserInfo = async (token: string) => {
    try {
      const response = await fetch('http://localhost:8080/api/public/userinfo', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User Info:", data);
        if (data.image) {
          setImage(data.image);
        }
      } else {
        setError('Failed to fetch user info.');
      }
    } catch (error) {
      setError('Failed to fetch user info. ' + error);
    }
  };

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/public/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name,
          username,
          email,
          password,
          gender: gender || null,
          image,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsSignedIn(true);
        handleClose();
        console.log(data);
        setError("");
      } else {
        const data = await response.json();
        setError(data.message || 'Sign-up failed. Please check your details.');
      }
    } catch (error) {
      setError('Sign-up failed. Please try again later.' + error);
    }
  };

  const convertToBase64 = (file: File): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const base64 = await convertToBase64(e.target.files[0]);
      setImage(base64);
    }
  };

  const switchToSignUp = () => {
    setIsSignUp(true);
    setError('');
  };

  const switchToSignIn = () => {
    setIsSignUp(false);
    setError('');
  };

  const handleGo = () => {
    setIsSignedIn(true);
    handleClose();
  };

  useEffect(() => {
    if (!show) {
      setError('');
    }
  }, [show]);

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
        <form onSubmit={isSignUp ? handleSignUp : handleSignIn}>
          {isSignUp && (
            <>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </>
          )}
          <div className="form-group">
            <label htmlFor={isSignUp ? "email" : "emailOrUsername"}>
              {isSignUp ? "Email:" : "Email or Username:"}
            </label>
            <input
              type={isSignUp ? "email" : "text"}
              id={isSignUp ? "email" : "emailOrUsername"}
              name={isSignUp ? "email" : "emailOrUsername"}
              value={isSignUp ? email : emailOrUsername}
              onChange={(e) => isSignUp ? setEmail(e.target.value) : setEmailOrUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {isSignUp && (
            <>
              <div className="form-group">
                <label htmlFor="gender">Gender:</label>
                <select
                  id="gender"
                  name="gender"
                  value={gender || ''}
                  onChange={(e) => setGender(e.target.value || null)}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="image">Profile Image:</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                />
              </div>
            </>
          )}
          {error && <p className="error">{error}</p>}
          <div className="modal-buttons">
            <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
            <button type="button" onClick={() => { setError(''); handleClose(); }}>Close</button>
            <button type="button" onClick={handleGo}>Go</button>
          </div>
        </form>
        <div className="toggle-form">
          {isSignUp ? (
            <p>
              Already have an account? <button type="button" onClick={switchToSignIn}>Sign In</button>
            </p>
          ) : (
            <p>
              Don't have an account? <button type="button" onClick={switchToSignUp}>Sign Up</button>
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Modal;
