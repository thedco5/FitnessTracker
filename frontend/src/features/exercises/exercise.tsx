import type { Exercise as ExerciseType } from './types';
import React from 'react';
import './card.css';

interface ExtendedExerciseType extends ExerciseType {
  calories: string;
  duration: string;
  durationType: string;
  difficulty: string;
  likes: number;
  visibility: string;
  onClick: () => void;
  isSelected: boolean;
}

export const ExerciseCard: React.FC<ExtendedExerciseType> = ({
  id, name, description, image, calories, duration, durationType, difficulty, visibility, onClick, isSelected
}) => {
  return (
    <div
      className={`ExerciseCard ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
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
