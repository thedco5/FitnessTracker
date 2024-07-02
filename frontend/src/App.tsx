import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './Navbar';
import Exercise from './Exercise';

const Home = () => <div>Home Page</div>;

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <Router>
      <div>
        <Navbar isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercise" element={<Exercise />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
