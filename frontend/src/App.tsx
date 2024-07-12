import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import { useState } from 'react';
import Navbar from './Navbar';
import { Exercises } from "./features/exercises";
import { Workouts } from "./features/workouts";
import { Workout } from "./features/workouts/Workout";
import { AddExercises } from "./features/workouts/addExercise/addExercises.tsx"; 
import "./App.css";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<{ username: string; email: string; image: string | null }>({
    username: '',
    email: '',
    image: null,
  });

  return (
    <Router>
        <Navbar isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} userInfo={userInfo} setUserInfo={setUserInfo} />
        <Routes>
          <Route path="*" element={<Navigate to="/workouts"/>} />
          <Route path="/exercises" element={<Exercises isSignedIn={isSignedIn} />} />
          <Route path="/workouts" element={<Workouts isSignedIn={isSignedIn} showAddModal={undefined} />} />
          <Route path="/workout/:workoutId" element={<Workout />} />
          <Route path="/workout/addExercise" element={<AddExercises onAddExercise={undefined} />} />
        </Routes>
    </Router>
  );
}

export default App;