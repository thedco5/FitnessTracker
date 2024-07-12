import React from 'react';
import { ModalProps } from './types';
import './modalx.css';

export const Modal: React.FC<ModalProps> = ({ showModal, closeModal, handleSubmit, handleChange, handleImageChange, formData }) => {
    const showHideClassName = showModal ? "modal display-block" : "modal display-none";

    return (
      <div className={showHideClassName} onClick={closeModal}>
          <div className="modal-main" onClick={e => e.stopPropagation()}>
              <form onSubmit={handleSubmit}>
                  <div className="form-group">
                      <label htmlFor="name">Name:</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                      <label htmlFor="description">Description:</label>
                      <input type="text" name="description" value={formData.description} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                      <label htmlFor="caloriesPerMinute">Calories Per Minute:</label>
                      <input type="number" name="caloriesPerMinute" value={formData.caloriesPerMinute} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                      <label htmlFor="type">Type:</label>
                      <select name="type" value={formData.type} onChange={handleChange} required>
                          <option value="time">Time</option>
                          <option value="weight">Weight</option>
                      </select>
                  </div>
                  <div className="form-group">
                      <label htmlFor="visibility">Visibility:</label>
                      <select name="visibility" value={formData.visibility} onChange={handleChange} required>
                          <option value="public">Public</option>
                          <option value="private">Private</option>
                      </select>
                  </div>
                  <div className="form-group">
                      <label htmlFor="image">Image:</label>
                      <input type="file" name="image" onChange={handleImageChange} required />
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
