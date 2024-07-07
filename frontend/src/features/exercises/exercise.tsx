
import React from 'react';
import type { Exercise as ExerciseType } from './types';
import './card.css';

interface ExtendedExerciseType extends ExerciseType {
  calories: string;
  duration: string;
  durationType: string;
  difficulty: string;
  likes: number;
  visibility: string;
}

export const ExerciseCard: React.FC<ExtendedExerciseType> = ({ id, name, description, image, calories, duration, durationType, difficulty, visibility }) => {
    return (
        <div className="ExerciseCard">
            <img src={image ?? undefined} alt={description} className="ExerciseCard-image" />
            <div className="ExerciseCard-info">
                <h3 className="ExerciseCard-title">{name}</h3>
                <p className="ExerciseCard-description">{description}</p>
            </div>
            <div className="ExerciseCard-details">
                <p><strong>Calories:</strong> {calories}</p>
                <p><strong>Duration:</strong> {duration} {durationType}</p>
                <p><strong>Difficulty:</strong> {difficulty}</p>
                <p><strong>Visibility:</strong> {visibility}</p>
            </div>
        </div>
    );
};
