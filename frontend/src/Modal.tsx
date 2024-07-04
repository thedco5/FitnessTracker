import React, { useState, useEffect } from 'react';
import './Modal.css';

const Modal = ({ show, handleClose, setIsSignedIn }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://your-backend-api.com/auth/signin', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailOrUsername, password }),
      });
      const data = await response.json();

      if (response.ok) {
        console.log(data); 
        setIsSignedIn(true);
        handleClose(); 
      } else {
        setError(data.message || 'Sign-in failed. Please check your credentials.');
      }
    } catch (error) {
      setError('Sign-in failed. Please try again later.');
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://your-backend-api.com/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        console.log(data); 
        setIsSignedIn(true);
        handleClose(); 
      } else {
        setError(data.message || 'Sign-up failed. Please check your details.');
      }
    } catch (error) {
      setError('Sign-up failed. Please try again later.');
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
