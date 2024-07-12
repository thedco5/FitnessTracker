import React, { useState } from 'react';
import { ModalProps } from './types';
import './modalx.css';
import { getAccessToken } from '../../auth';

export const Modal: React.FC<ModalProps> = ({
  showModal,
  closeModal,
  handleSubmit,
  handleChange,
  handleImageChange,
  formData,
}) => {
  const showHideClassName = showModal ? 'modal display-block' : 'modal display-none';

  const handleAddExercise = async (e: React.FormEvent) => {
    e.preventDefault();

    const exerciseData = {
      name: formData.name,
      description: formData.description,
      calories: formData.calories,
      duration: formData.duration,
      durationType: formData.durationType.toUpperCase(),
      difficulty: formData.difficulty.toUpperCase().replace(' ', '_'),
      type: 'UPPER_BODY', 
      visibility: formData.visibility.toUpperCase(),
      image: formData.image ? { data: "formData.image" } : null,
    };

    try {
      const token = getAccessToken();
      console.log(JSON.stringify(exerciseData));
      const response = await fetch('http://localhost:8080/api/exercise', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(exerciseData),
      });
    
      if (response.ok) {
        const data = await response.text();
        console.log('Exercise added:', data);
        closeModal();
      } else {
        const errorText = await response.text();
        console.error(`Failed to add exercise: ${errorText}`);
      }
    } catch (error) {
      console.error(`Failed to add exercise: ${error}`);
    }
    
  };

  return (
    <div className={showHideClassName} onClick={closeModal}>
      <div className="modal-main" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleAddExercise}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input type="text" name="description" value={formData.description} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="calories">Calories:</label>
            <input type="number" name="calories" value={formData.calories} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="duration">Duration:</label>
            <input type="number" name="duration" value={formData.duration} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="durationType">Duration Type:</label>
            <select name="durationType" value={formData.durationType} onChange={handleChange}>
              <option value="reps">Reps</option>
              <option value="seconds">Seconds</option>
              <option value="pairs">Pairs</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="difficulty">Difficulty:</label>
            <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
              <option value="very easy">Very Easy</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
              <option value="expert">Expert</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="visibility">Visibility:</label>
            <select name="visibility" value={formData.visibility} onChange={handleChange}>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="image">Image:</label>
            <input type="file" name="image" onChange={handleImageChange}  />
          </div>
          <div className="modal-buttons">
            <button type="submit">Add Exercise</button>
            <button type="button" onClick={closeModal}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
