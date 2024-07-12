import type { Exercise as ExerciseType } from './types';
import React from 'react';
import './card.css';
import './modalx.css';
import customFetch from '../../api/requests';

interface ExtendedExerciseType extends ExerciseType {
  onClick: () => void;
  isSelected: boolean;
  fetchExercises: () => void;
}

export const ExerciseCard: React.FC<ExtendedExerciseType> = ({
                                                               id, name, description, image, caloriesPerMinute, visibility, type, onClick, isSelected, fetchExercises
                                                             }) => {

  const deleteExercise = (id: string) => {
    return async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken)
          throw new Error("No access token found!");
        const response = await customFetch(
          '/exercise/'
          + id,
          'DELETE', null
        );
        if (response.ok) {
          fetchExercises();
        } else {
          throw new Error(`Request failed: [${response.status}] ${response.statusText}: ${await response.text()}`)
        }
      } catch (error) {
        console.error('Failed to unlike workout. ' + error);
      }
    }
  }
                                          
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
          <div className='modal-buttons'>
            {
              visibility == "PRIVATE" ?
                <button className='red' onClick={deleteExercise(id)}>Delete</button> :
                <></>
            }
          </div>
          
        </div>
      </div>
    </div>
  );

};
