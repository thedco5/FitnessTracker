import {useEffect, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import {DndProvider, useDrag, useDrop} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {workoutMockup} from "./constants.ts";
import {exercisesMockup} from "../exercises/constants.ts";
import './workout.css';
import likeoff from '../../Images/likeoff.svg';
import delete1 from '../../Images/delete.svg';
import likeon from '../../Images/likeon.svg';
import Caloriesblack from '../../Images/CaloriesBlack.svg';
import timeblack from '../../Images/Timeblack.svg';
import {AddExerciseCardModal} from "./addExerciseCardModal.tsx";
import {WorkoutExCard} from "./types.ts";

const ItemTypes = {
  EXERCISE: 'exercise',
};

const ExerciseItem = ({id, name, description, image, idx, repeat, time, onDelete, moveExercise}) => {
  const [, ref] = useDrag({
    type: ItemTypes.EXERCISE,
    item: {id, idx},
  });

  const [, drop] = useDrop({
    accept: ItemTypes.EXERCISE,
    hover: (draggedItem) => {
      if (draggedItem.idx !== idx) {
        moveExercise(draggedItem.idx, idx);
        draggedItem.idx = idx;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} className="exercise-item">
      <div className="exercise-details">
        <div className="play-icon">
          <img src={image} alt={name} className="exercies-image"/>
        </div>
        <div>
          <p className="exercise-name">{name}</p>
          <p className="exercise-duration">{description}</p>
          <p className="exercise-duration">Repetitions: {repeat}</p>
          <p className="exercise-duration">Time: {time} sec</p>
        </div>
      </div>
      <div className="exercise-actions">
        <button onClick={() => onDelete(idx)} className="delete-button"><img src={delete1} alt="delete"/></button>
      </div>
    </div>
  );
};

const initialCardData: WorkoutExCard = {
  id: 'new',
  repeat: 1,
  time: 1,
  exId: '',
  calculatedCalories: undefined,
  calculatedTime: undefined,
};
export const Workout = () => {
  const myUserId = "12345"; // TODO get from Auth
  const {workoutId} = useParams();
  const currentWorkout = workoutMockup.find(el => el.id === workoutId);

  const {name, likes, createdBy, exercises, image, description, totalCalories, totalTime} = currentWorkout || {};
  const [showModal, setShowModal] = useState(false);
  const [currentExercisesList, setCurrentExercisesList] = useState<WorkoutExCard[]>(exercises);
  const [currentLikes, setCurrentLikes] = useState<string[]>(likes);
  const [exerciseCardFilds, setExerciseCardFilds] = useState<WorkoutExCard>(initialCardData);

  console.log('currentExercisesList: ', currentExercisesList)

  const closeModal = () => {
    setExerciseCardFilds(initialCardData);
    setShowModal(false);
  };

  if (!currentWorkout) {
    return <div>Workout not found</div>;
  }


  const handleDelete = (idx) => {
    setCurrentExercisesList(currentExercisesList.filter((_, i) => i !== idx));
  };

  const moveExercise = (fromIndex, toIndex) => {
    const updatedList = Array.from(currentExercisesList);
    const [movedItem] = updatedList.splice(fromIndex, 1);
    updatedList.splice(toIndex, 0, movedItem);
    setCurrentExercisesList(updatedList);
  };

  const getExercise = ({workoutExercise, idx}) => {
    const {id, exId, repeat, time} = workoutExercise;
    const exercise = exercisesMockup.find(element => element.id === exId);
    return exercise ? (
      <ExerciseItem
        key={id}
        id={id}
        name={exercise.name}
        description={exercise.description}
        image={exercise.image}
        repeat={repeat}
        time={time}
        idx={idx}
        onDelete={handleDelete}
        moveExercise={moveExercise}
      />
    ) : null;
  };


  // const handleAddExercise = (selectedExercises) => {
  //   const newExercises = selectedExercises.map(exId => {
  //     const exercise = exercisesMockup.find(e => e.id === exId);
  //     return {
  //       id: `new-${exId}-${Date.now()}`, // generate unique id for each new exercise
  //       exId: exId,
  //       ...exercise
  //     };
  //   });
  //
  //   setCurrentExercisesList([...currentExercisesList, ...newExercises]);
  // };

  const hasLike = currentLikes?.includes(myUserId);

  const handelChangeLike = () => {
    if (hasLike) {
      const newLikes = currentLikes.filter(el => el !== myUserId);
      setCurrentLikes(newLikes);
    } else {
      const newLikes = [...currentLikes, myUserId];
      setCurrentLikes(newLikes);
    }
  };


  const createNewCard = () => {
    const calloriesPerMinute = exercisesMockup.find(el => el.id === exerciseCardFilds.exId).caloriesPerMinute || 0;
    const newCard = {
      ...exerciseCardFilds,
      id: uuidv4(),
      calculatedTime: exerciseCardFilds.time * exerciseCardFilds.repeat,
      calculatedCalories: exerciseCardFilds.repeat * calloriesPerMinute,
    };
    return newCard;
  }
  const handleSubmit = () => {
    setCurrentExercisesList((prev) => [...prev, createNewCard()]);
    setExerciseCardFilds(initialCardData);
    setShowModal(false);
  }

  const totalWorkoutCallories = currentExercisesList.reduce((accumulator, currentObject) => {
    return accumulator + currentObject.calculatedCalories;
  }, 0);
  const totalWorkoutTime = currentExercisesList.reduce((accumulator, currentObject) => {
    return accumulator + currentObject.calculatedTime;
  }, 0);



  return (
    <div className="main-wrapper">
      <div className="workoutPage">
        <div className="columnsWrapper">
          <div className="leftColumnWrapper">
            <div className="container-workout">
              <div className="workoutDetails">
                <img src={image} alt={name} className="workoutImage"/>
                <h2 className="workoutsTitle">{name}</h2>
                <h3 className="workoutCreator">Created by: {createdBy}</h3>
                <div className="workout-card-stats">
                  <h2 className="workoutMinutes"><img src={timeblack} alt="Time"/> {totalWorkoutTime}</h2>
                  <h2 className="workoutKcal"><img src={Caloriesblack} alt="Calories"/> {totalWorkoutCallories}</h2>
                </div>
                <button onClick={handelChangeLike} className="likeIcon">
                  {hasLike
                    ? <span><img src={likeon} alt="like on icon"/> {currentLikes?.length}</span>
                    : <span><img src={likeoff} alt="like off icon"/> {currentLikes?.length}</span>}
                </button>
                <p className="workoutDescription">{description}</p>
                {/*<Link to="/workout/addExercise" className="add-exercise-button">Add New Exercise</Link>*/}
                <button className="add-exercise-button" onClick={() => setShowModal(true)}>
                  Add New Exercise
                </button>
              </div>
            </div>
          </div>
          <div className="rightColumnWrapper">
            <DndProvider backend={HTML5Backend}>
              <div className="container-workout">
                <div className="exercise-list">
                  {currentExercisesList.map((exercise, idx) => getExercise({workoutExercise: exercise, idx}))}
                </div>
              </div>
            </DndProvider>
          </div>
        </div>
        {/*<Routes>*/}
        {/*  <Route path="/workout/addExercise" element={<AddExercises onAddExercise={handleAddExercise}/>}/>*/}
        {/*</Routes>*/}
      </div>
      <AddExerciseCardModal
        showModal={showModal}
        closeModal={closeModal}
        handleSubmit={handleSubmit}
        setExercisrCardFilds={setExerciseCardFilds}
        exercisrCardFilds={exerciseCardFilds}
      />
    </div>
  );
};
