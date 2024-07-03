import React from 'react';
import { useParams } from "react-router-dom";
import { workoutMockup } from "./constants.ts";
import { exercisesMockup } from "../exercises/constants.ts";
import { ExerciseCard } from "../exercises";
import './workouts.css';

export const Workout = () => {
    const { workoutId } = useParams();
    const currentWorkout = workoutMockup.find(el => el.id === workoutId) || 'not found';
    if (currentWorkout === 'not found') {
        return <div>Workout not found</div>;
    }

    const { name, likes, createdBy, exercises, image } = currentWorkout;

    const getExercise = (id) => {
        const exercise = exercisesMockup.find(element => element.id === id);
        return exercise ? <ExerciseCard key={exercise.id} id={exercise.id} name={exercise.name} description={exercise.description} image={exercise.image} /> : null;
    };

    return (
        <div className="workoutPage">
            <img src={image} alt={name} className="workoutImage" />
            <div className="workoutDetails">
                <p className="workoutCreatedBy">Created by: {createdBy}</p>
                <h2 className="workoutName">{name}</h2>
                <div className="workoutLikes">
                    <span className="likeIcon">❤️</span> {likes.length}
                </div>
                <div className="exercisesList">
                    {exercises.map(exerciseId => getExercise(exerciseId))}
                </div>
            </div>
        </div>
    );
};
