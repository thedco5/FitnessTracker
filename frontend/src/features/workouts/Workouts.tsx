import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modalx } from './modalx';
import { workoutMockup } from "./constants";
import { Workout } from "./types";
import './workouts.css';
import './searchbar.css';
import likeoff from '../../Images/likeoff.svg';
import likeon from '../../Images/likeon.svg';
import Caloriesblack from '../../Images/CaloriesBlack.svg';
import timeblack from '../../Images/Timeblack.svg';
import WorkOut from '../../Images/WorkOut.svg';

const addWorkoutToDatabase = async (workout) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, data: workout }), 500);
  });
};

const WorkoutCard = ({ workout, isSignedIn }: { workout: Workout, isSignedIn: boolean }) => {
  const myUserId = "12345"; // TODO Replace with real user ID
  const [currentLikes, setCurrentLikes] = useState(workout.likes);
  const [showComments, setShowComments] = useState(false); // State for showing comments dropdown
  const [newComment, setNewComment] = useState(''); // State for new comment
  const [comments, setComments] = useState(workout.comments); // State for comments

  const hasLike = currentLikes?.includes(myUserId);

  const handleChangeLike = () => {
    const newLikes = hasLike
      ? currentLikes.filter(el => el !== myUserId)
      : [...currentLikes, myUserId];
    setCurrentLikes(newLikes);
  };

  const toggleComments = (e) => {
    e.preventDefault();
    setShowComments(!showComments);
  };

  const handleNewCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleNewCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);
      setNewComment('');
    }
  };

  return (
    <div className="workout-card">
      <Link to={`/workout/${workout.id}`} className="workout-card-link">
        <div className="workout-card-container">
          <div className="workout-card-info">
            <div className="workout-card-details">
              <h3 className="workout-card-title">{workout.name}</h3>
              <div className="workout-card-stats">
                <h3 className="workout-card-Time"><img src={timeblack} alt="Time" /> {workout.totalTime} Minutes</h3>
                <h3 className="workout-card-Calories"><img src={Caloriesblack} alt="Calories" /> {workout.totalCalories} Kcal</h3>
                <h3 className="workout-card-Exercises"><img src={WorkOut} alt="Exercises" /> {workout.exercises.length} Exercises</h3>
              </div>
            </div>
            <div className="workout-card-actions">
              <p className="workout-card-description">{workout.description}</p>
              <div className="workout-card-like">
                <button onClick={(e) => {
                  e.preventDefault();
                  handleChangeLike();
                }} className="likeIcons">
                  {hasLike
                    ? <span><img src={likeon} alt="like on" /> {currentLikes.length}</span>
                    : <span><img src={likeoff} alt="like off" /> {currentLikes.length}</span>
                  }
                </button>
              </div>
              {isSignedIn && (
                <button className="comments-button" onClick={toggleComments}>Comments</button>
              )}
            </div>
          </div>
          <div className="workout-card-image-container">
            <img src={workout.image} alt={workout.name} className="workout-card-image" />
          </div>
        </div>
      </Link>
      {showComments && (
        <div className="comments-dropdown">
          {comments?.length > 0 ? (
            comments.map((comment, index) => (
              <p key={index}>{comment}</p>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
          <form onSubmit={handleNewCommentSubmit} className="new-comment-form">
            <input
              type="text"
              placeholder="Write a comment..."
              value={newComment}
              onChange={handleNewCommentChange}
              className="new-comment-input"
            />
            <button type="submit" className="new-comment-button">Add Comment</button>
          </form>
        </div>
      )}
    </div>
  );
};

export const Workouts = ({ isSignedIn }) => {
  const [workouts, setWorkouts] = useState(workoutMockup);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    createdBy: '',
    image: null,
    exercises: [],
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState(''); // Added state for filter
  const [filteredWorkouts, setFilteredWorkouts] = useState(workouts);

  useEffect(() => {
    let filtered = workouts.filter(workout =>
      workout.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filter === 'mostLikes') {
      filtered.sort((a, b) => b.likes.length - a.likes.length);
    } else if (filter === 'leastLikes') {
      filtered.sort((a, b) => a.likes.length - b.likes.length);
    }

    setFilteredWorkouts(filtered);
  }, [workouts, searchTerm, filter]); // Added filter to dependency array

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageUrl = URL.createObjectURL(formData.image);

    const newWorkout = {
      id: (workouts.length + 1).toString(),
      name: formData.name,
      createdBy: formData.createdBy,
      image: imageUrl,
      exercises: [],
      likes: [],
      comments: [], // Assuming new workouts start with no comments
      favorites: false, // Assuming new workouts are not favorited by default
    };

    try {
      const response = await addWorkoutToDatabase(newWorkout);
      if (response.success) {
        setWorkouts([...workouts, response.data]);
      }
    } catch (error) {
      console.error('Error adding workout:', error);
    }

    setFormData({
      name: '',
      createdBy: '',
      image: null,
      exercises: [],
    });
    closeModal();
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="gray-bg">
      {isSignedIn && (
        <button className="add-exercise-button" onClick={openModal}>Add Workout</button>
      )}
      <div className="container">
        <input
          type="text"
          placeholder="Search workouts by name..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select onChange={handleFilterChange} value={filter} className="filter-select">
          <option value="">No Filter</option>
          <option value="mostLikes">Most Likes</option>
          <option value="leastLikes">Least Likes</option>
        </select>
      </div>
      <div className="main-wrapper">
        <div className="workouts-list-wrapper">
          {filteredWorkouts.map((workout) => <WorkoutCard key={workout.id} workout={workout} isSignedIn={isSignedIn} />)}
        </div>
      </div>
      <Modalx
        showModal={showModal}
        closeModal={closeModal}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleImageChange={handleImageChange}
        formData={formData}
      />
    </div>
  );
};
