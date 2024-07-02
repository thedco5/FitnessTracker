import React from 'react';
import type { Exercise as ExerciseType } from './types';
import './card.css';

export const ExerciseCard: React.FC<ExerciseType> = ({ id, name, description, image }) => {
    return (
        <div className="ExerciseCard">
            <img src={image} alt={description} className="ExerciseCard-image" />
            <div className="ExerciseCard-info">
                <h3 className="ExerciseCard-title">{name}</h3>
                <p className="ExerciseCard-description">{description}</p>
            </div>
        </div>
    );
};
