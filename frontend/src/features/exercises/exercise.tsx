import type { Exercise as ExerciseType } from './types';
import React from 'react';
import './card.css';

interface ExtendedExerciseType extends ExerciseType {
  onClick: () => void;
  isSelected: boolean;
}

export const ExerciseCard: React.FC<ExtendedExerciseType> = ({
                                                               id, name, description, image, caloriesPerMinute, visibility, type, onClick, isSelected
                                                             }) => {
                                                              console.log(image)
  return (
    <div className="ExerciseCard">
      <div className="ExerciseCard-inner">
        <img src={image ?? undefined} alt={description} className="ExerciseCard-image" />
        <div className="ExerciseCard-content-wrapper">
          <div className="ExerciseCard-content">
            <h3 className="ExerciseCard-title">{name}</h3>
            <p className="ExerciseCard-description">{description}</p>
          </div>
          <div className="ExerciseCard-details">
            <p><strong>Calories per Minute:</strong> {caloriesPerMinute}</p>
            <p><strong>Type:</strong> {type}</p>
            <p><strong>Visibility:</strong> {visibility}</p>
          </div>
        </div>
      </div>
    </div>
  );

};
