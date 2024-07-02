import React from 'react';
import { exercisesMockup } from "./constants";
import { ExerciseCard } from "./exercise";
import './card.css';

export const Exercises = () => {
    return (
        <div className="cards-container">
            {exercisesMockup.map(el => <ExerciseCard key={el.id} {...el} />)}
        </div>
    );
};

