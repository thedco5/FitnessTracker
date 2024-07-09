import { useState } from 'react';
import { exercisesMockup } from "../../exercises/constants";
import './addExercises.css';

export const AddExercises = ({ onAddExercise }) => {
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);

  const handleToggleExercise = (exerciseId: string) => {
    setSelectedExercises((prevSelected) =>
      prevSelected.includes(exerciseId)
        ? prevSelected.filter((id) => id !== exerciseId)
        : [...prevSelected, exerciseId]
    );
  };

  const handleAddExercises = () => {
    onAddExercise(selectedExercises);
    setSelectedExercises([]);
  };

  return (
    <div className="add-exercises">
      <h2>Available Exercises</h2>
      <div className="cards-container">
        {exercisesMockup.map((exercise) => (
          <div
            key={exercise.id}
            className={`ExerciseCard ${selectedExercises.includes(exercise.id) ? 'selected' : ''}`}
            onClick={() => handleToggleExercise(exercise.id)}
          >
            <img src={exercise.image} alt={exercise.name} className="ExerciseCard-image" />
            <div className="ExerciseCard-info">
              <h3 className="ExerciseCard-title">{exercise.name}</h3>
              <p className="ExerciseCard-description">{exercise.description}</p>
            </div>
            {selectedExercises.includes(exercise.id) && (
              <div className="ExerciseCard-details">
                <p>Calories: {exercise.calories}</p>
                <p>Duration: {exercise.duration}</p>
                <p>Difficulty: {exercise.difficulty}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <button onClick={handleAddExercises} className="add-selected-exercises-button">Add Selected Exercises</button>
    </div>
  );
};
