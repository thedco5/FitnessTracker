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
      const data = await response.json();

      if (response.ok) {
        console.log(data); 
        setIsSignedIn(true);
        handleClose(); 
      } else {
        setError(data.message || 'Sign-in failed. Please check your credentials.');
      }
    } catch (error) {
      setError('Sign-in failed. Please try again later.' + error);
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
          username : "placeholder", 
          email : email, 
          password : password 
        }),
      });
      const data = await response.json();

      if (response.ok) {
        console.log(data); 
        setIsSignedIn(true);
        handleClose(); 
        setError("");
      } else {
        setError(data.message || 'Sign-up failed. Please check your details.');
      }
    } catch (error) {
      setError('Sign-up failed. Please try again later.' + error);
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
