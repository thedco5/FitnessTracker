import {exercisesMockup} from "../exercises/constants.ts";

export const AddExerciseCardModal = ({ showModal, closeModal, handleSubmit, setExercisrCardFilds, exercisrCardFilds }) => {
  const showHideClassName = showModal ? "modal display-block" : "modal display-none";

  const selectOptions = exercisesMockup.map((el) => ({value: el.id, label: el.name}));

  return (
    <div className={showHideClassName} onClick={closeModal}>
      <div className="modal-main" onClick={e => e.stopPropagation()}>
        <form>
          <div className="form-group">
            <label htmlFor="selectEx">Select exercise:</label>
            <select
              id="selectEx"
              name="exId"
              value={exercisrCardFilds.exId}
              onChange={(e) => setExercisrCardFilds(prev => ({...prev, exId: e.target.value}))}
              required
            >
              <option value="">-- Select an exercise --</option>
              {selectOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="repeat">Repeats:</label>
            <input type="number" name="repeat" value={exercisrCardFilds.repeat} onChange={(e) => setExercisrCardFilds(prev => ({...prev, repeat: e.target.value}))} required />
          </div>
          <div className="form-group">
            <label htmlFor="time">Time:</label>
            <input type="number" name="time" value={exercisrCardFilds.time} onChange={(e) => setExercisrCardFilds(prev => ({...prev, time: e.target.value}))} required />
          </div>
          <div className="modal-buttons">
            <button type="button" onClick={handleSubmit}>Add Workout</button>
            <button type="button" onClick={closeModal}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};