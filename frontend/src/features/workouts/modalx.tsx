import React from 'react';
import './modalx.css';

export const Modalx = ({showModal, closeModal, handleSubmit, handleChange, handleImageChange, formData}) => {
  const showHideClassName = showModal ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName} onClick={closeModal}>
      <div className="modal-main" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required/>
          </div>
          <div className="form-group">
            <label htmlFor="description">description:</label>
            <input type="text" name="description" value={formData.description} onChange={handleChange} required/>
          </div>
          <div className="form-group">
            <label htmlFor="image">Image:</label>
            <input type="file" name="image" onChange={handleImageChange} required/>
          </div>
          <div className="modal-buttons">
            <button type="submit">Add Workout</button>
            <button type="button" onClick={closeModal}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};
