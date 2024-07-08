import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from './modalx';
import { workoutMockup } from "./constants.ts";
import { Workout } from "./types.ts";
import './workouts.css';
import './searchbar.css';
import likeoff from '../../images/likeoff.svg';
import likeon from '../../images/likeon.svg';
import Caloriesblack from '../../images/CaloriesBlack.svg';
import timeblack from '../../images/Timeblack.svg';
import WorkOut from '../../images/WorkOut.svg';
const addWorkoutToDatabase = async (workout) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ success: true, data: workout }), 500);
    });
};

const WorkoutCard = ({ workout }: { workout: Workout }) => {
    const myUserId = "12345"; 
    const [currentLikes, setCurrentLikes] = useState(workout.likes);

    const hasLike = currentLikes?.includes(myUserId);

    const handleChangeLike = () => {
        if (hasLike) {
            const newLikes = currentLikes.filter(el => el !== myUserId);
            setCurrentLikes(newLikes);
        } else {
            const newLikes = [...currentLikes, myUserId];
            setCurrentLikes(newLikes);
        }
    };

    return (
      <Link to={`/workout/${workout.id}`} className="workout-card">
          <div className="workout-card-container">
              <div className="workout-card-info">
                  <div className="workout-card-details">
                      <h3 className="workout-card-title">{workout.name}</h3>
                      <div className="workout-card-stats">
                          <h3 className="workout-card-Time"><img src={timeblack} alt="Time" /> {workout.duration} Minutes</h3>
                          <h3 className="workout-card-Calories"><img src={Caloriesblack} alt="Calories" /> {workout.calories} Kcal</h3>
                          <h3 className="workout-card-Exercises"><img src={WorkOut} alt="Exercises" /> {workout.exercises.length} Exercises</h3>
                      </div>
                  </div>
                  <div className="workout-card-actions">
                      <p className="workout-card-description">{workout.description}</p>
                      <div className="workout-card-like">
                          <button onClick={(e) => { e.preventDefault(); handleChangeLike(); }} className="likeIcons">
                              {hasLike
                                ? <span><img src={likeon} alt="like on" /> {currentLikes.length}</span>
                                : <span><img src={likeoff} alt="like off" /> {currentLikes.length}</span>
                              }
                          </button>
                      </div>
                  </div>
              </div>
              <img src={workout.image} alt={workout.name} className="workout-card-image" />
          </div>
      </Link>
    );
};

export const Workouts = ({ isSignedIn }) => {
    const [workouts, setWorkouts] = useState(workoutMockup);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        createdBy: '',
        image: null,
        exercises: [],
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState(''); // Added state for filter
    const [filteredWorkouts, setFilteredWorkouts] = useState(workouts);

    useEffect(() => {
        let filtered = workouts.filter(workout =>
            workout.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (filter === 'mostLikes') {
            filtered.sort((a, b) => b.likes.length - a.likes.length);
        } else if (filter === 'leastLikes') {
            filtered.sort((a, b) => a.likes.length - b.likes.length);
        }

        setFilteredWorkouts(filtered);
    }, [workouts, searchTerm, filter]); // Added filter to dependency array

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, image: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const imageUrl = URL.createObjectURL(formData.image);

        const newWorkout = {
            id: (workouts.length + 1).toString(),
            name: formData.name,
            createdBy: formData.createdBy,
            image: imageUrl,
            exercises: [],
            likes: [],
        };

        try {
            const response = await addWorkoutToDatabase(newWorkout);
            if (response.success) {
                setWorkouts([...workouts, response.data]);
            }
        } catch (error) {
            console.error('Error adding workout:', error);
        }

        setFormData({
            name: '',
            createdBy: '',
            image: null,
            exercises: [],
        });
        closeModal();
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    return (
        <div>
            {isSignedIn && (
                <button className="add-exercise-button" onClick={openModal}>Add Workout</button>
            )}
            <div className="container">
                <input
                    type="text"
                    placeholder="Search workouts by name..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <select onChange={handleFilterChange} value={filter} className="filter-select">
                    <option value="">No Filter</option>
                    <option value="mostLikes">Most Likes</option>
                    <option value="leastLikes">Least Likes</option>
                </select>
                <div className="search"></div>
            </div>
            <div className="workouts-list-wrapper">
                {filteredWorkouts.map((workout) => <WorkoutCard key={workout.id} workout={workout} />)}
            </div>
            <Modal
                showModal={showModal}
                closeModal={closeModal}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleImageChange={handleImageChange}
                formData={formData}
            />
        </div>
    );
};
