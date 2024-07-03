import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './Navbar';
import { Exercises } from "./features/exercises";
import { Workouts } from "./features/workouts";
import { Workout } from "./features/workouts/Workout";

const Home = () => <div>Home Page</div>;

function App() {
    const [isSignedIn, setIsSignedIn] = useState(false);

    return (
        <Router>
            <div>
                <Navbar isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/exercises" element={<Exercises isSignedIn={isSignedIn} />} />
                    <Route path="/workouts" element={<Workouts isSignedIn={isSignedIn} />} />
                    <Route path="/workout/:workoutId" element={<Workout />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

