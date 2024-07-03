import {workoutMockup} from "./constants.ts";
import React from "react";
import {Workout} from "./types.ts";
import './workouts.css';
import {Link} from "react-router-dom";

const WorkoutCard = ({workout}: Workout) => {
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
    )
}

export const Workouts = () => {
    return (
        <div className="workoutsListWrapper">
            {workoutMockup.map((workout) => <WorkoutCard key={workout.id} workout={workout} />)}
        </div>
    );
};
