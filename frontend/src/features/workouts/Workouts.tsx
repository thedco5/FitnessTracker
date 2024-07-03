import { workoutMockup } from "./constants.ts";
import React, { useState } from "react";
import { Workout } from "./types.ts";
import './workouts.css';
import { Link } from "react-router-dom";
import Modal from './modalx';

const addWorkoutToDatabase = async (workout) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ success: true, data: workout }), 500);
    });
};

const WorkoutCard = ({ workout }: Workout) => {
    return (
        <Link to={`/workout/${workout.id}`} className="WorkoutCardWrapper">
            <img src={workout.image} alt={workout.name} className="WorkoutImage" />
            <div className="WorkoutCardDetails">
                <p className="workoutCreatedBy">Created by: {workout.createdBy}</p>
                <h4 className="workoutName">{workout.name}</h4>
                <div className="workoutLikes">
                    <span className="likeIcon">❤️</span> {workout.likes.length}
                </div>
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

    return (
        <div>
            {isSignedIn && (
                <button className="add-exercise-button" onClick={openModal}>Add Workout</button>
            )}
            <div className="workoutsListWrapper">
                {workouts.map((workout) => <WorkoutCard key={workout.id} workout={workout} />)}
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

