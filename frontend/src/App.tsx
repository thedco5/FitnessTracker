import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';

const Home = () => <div>Home Page</div>;
const Exercise = () => <div>Exercise Page</div>;

function App() {
  return (
      <Router>
          <div>
              <Navbar />
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/exercise" element={<Exercise />} />
              </Routes>
          </div>
      </Router>
  );
}

export default App;
