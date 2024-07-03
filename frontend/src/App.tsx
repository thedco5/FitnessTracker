import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './Navbar';
import {Exercises} from "./features/exercises";
import {Workouts} from "./features/workouts";
import {Workout} from "./features/workouts/Workout.tsx";

const Home = () => <div>Home Page</div>;

function App() {
    const [isSignedIn, setIsSignedIn] = useState(false);

    return (
        <Router>
            <div>
                <Navbar isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/exercises" element={<Exercises />} />
                    <Route path="/workouts" element={<Workouts />} />
                    <Route path="/workout/:workoutId" element={<Workout />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

