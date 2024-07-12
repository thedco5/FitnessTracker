import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {Modalx} from './modalx';
import {workoutMockup} from "./constants.ts";
import {Workout} from "./types.ts";
import './workouts.css';
import './searchbar.css';
import likeoff from '../../Images/likeoff.svg';
import likeon from '../../Images/likeon.svg';
import Caloriesblack from '../../Images/CaloriesBlack.svg';
import timeblack from '../../Images/Timeblack.svg';
import WorkOut from '../../Images/WorkOut.svg';
import add from "../../Images/add.svg";
import hover from "../../Images/hover.svg";
import commentShow from "../../Images/comment.svg"
import commentHide from "../../Images/commentOff.svg"
import onCircle from "../../Images/on.svg"
import offCircle from "../../Images/off.svg"
import {exercisesMockup} from "../exercises/constants.ts";
import {useGetWorkoutsQuery} from "../../api/dataApi/dataApi.ts";

const addWorkoutToDatabase = async (workout: {
    id: string; name: string; createdBy: string; image: string; exercises: never[]; likes: never[]; comments: never[]; // Initialize comments array
    favorites: boolean;
  }) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({success: true, data: workout}), 500);
  });
};

const WorkoutCard = ({workout, myUserId}: { workout: Workout }) => {
  const [totalWorkoutCalories, setTotalWorkoutCalories] = useState<number>(0);
  const [totalWorkoutTime, setTotalWorkoutTime] = useState<number>(0);
  const [currentLikes, setCurrentLikes] = useState(workout.likes);
  const [comments, setComments] = useState<string[]>(workout.comments || []);
  const [newComment, setNewComment] = useState<string>("");
  const [showComments, setShowComments] = useState<boolean>(false);

  const hasLike = currentLikes?.includes(myUserId);

  const {data, isLoading} = useGetWorkoutsQuery();
  const handleChangeLike = () => {
    const newLikes = hasLike
      ? currentLikes.filter(el => el !== myUserId)
      : [...currentLikes, myUserId];
    setCurrentLikes(newLikes);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim() !== "") {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  const getWorkoutSummary = () => {
    const workoutTime = workout.exercises.reduce((accumulator, currentObject) => {
      const time = currentObject.time || 0;
      const repeat = currentObject.repeat || 0;
      return accumulator + (time * repeat);
    }, 0);
    const workoutCalories = workout.exercises.reduce((accumulator, currentObject) => {
      const caloriesPerMinute = exercisesMockup.find(el => el.id === currentObject.exId)?.caloriesPerMinute || 0;
      const time = currentObject.time || 0;
      const repeat = currentObject.repeat || 0;
      return accumulator + (time * repeat * caloriesPerMinute);
    }, 0);
    setTotalWorkoutCalories(workoutCalories / 1000);
    setTotalWorkoutTime(workoutTime);
  };

  useEffect(() => {
    getWorkoutSummary();
  }, []);

  return (
    <div className="workout-card-container">
      <Link to={`/workout/${workout.id}`} className="workout-card">
        <div className="workout-card-info">
          <div className="workout-card-details">
            <h3 className="workout-card-title">{workout.name}</h3>
            <div className="workout-card-stats">
              <h3 className="workout-card-Time"><img src={timeblack} alt="Time"/>{totalWorkoutTime} Minutes</h3>
              <h3 className="workout-card-Calories"><img src={Caloriesblack}
                                                         alt="Calories"/> {totalWorkoutCalories} Kcal</h3>
              <h3 className="workout-card-Exercises"><img src={WorkOut}
                                                          alt="Exercises"/> {workout.exercises.length} Exercises</h3>

            </div>
            <div className="workout-card-like">
              <button onClick={(e) => {
                e.preventDefault();
                handleChangeLike();
              }} className="likeIcons">
                {hasLike
                  ? <span><img src={likeon} alt="like on"/> {currentLikes.length}</span>
                  : <span><img src={likeoff} alt="like off"/> {currentLikes.length}</span>
                }
              </button>
              <button onClick={(e) => {
                e.preventDefault();
                setShowComments(!showComments);
              }} className="toggle-comments-button">
                {showComments ? <span><img src={commentHide} alt="show on"/></span> :
                  <span><img src={commentShow} alt="show off"/></span>}
              </button>
            </div>
          </div>
          <div className="workout-card-actions">
            <p className="workout-card-description">{workout.description}</p>

          </div>
        </div>
        <img src={workout.image} alt={workout.name} className="workout-card-image"/>
      </Link>
      {showComments && (
        <div className="workout-card-comments">
          <h4>Comments</h4>
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
          <form onSubmit={handleAddComment}>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment"
            />
            <button type="submit">Add Comment</button>
          </form>
        </div>
      )}
    </div>
  );
};

export const Workouts = ({isSignedIn}) => {
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
  const [likedOnly, setLikedOnly] = useState(false);

  const userId = "12345"; // TODO replace from user

  useEffect(() => {
    let filtered = workouts.filter(workout =>
      workout.name.toLowerCase().includes(searchTerm.toLowerCase()) && likedOnly ? workout.likes.includes(userId) : true
    );

    if (filter === 'mostLikes') {
      filtered.sort((a, b) => b.likes.length - a.likes.length);
    } else if (filter === 'leastLikes') {
      filtered.sort((a, b) => a.likes.length - b.likes.length);
    }

    setFilteredWorkouts(filtered);
  }, [workouts, searchTerm, filter, likedOnly]); // Added filter to dependency array

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({...formData, image: file});
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
      comments: [], // Initialize comments array
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
        <button className="add-exercise-button" onClick={openModal}>
          <img src={add} alt="add" className="default-image"/>
          <img src={hover} alt="add-hover" className="hover-image"/>
        </button>
      )}
      <div className="container">
        <input
          type="text"
          placeholder="Search workouts by name..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select onChange={handleFilterChange} value={filter} className="filter-select">
          <option value="">No Sort</option>
          <option value="mostLikes">Most Likes</option>
          <option value="leastLikes">Least Likes</option>
        </select>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={likedOnly}
            onChange={() => setLikedOnly(prevState => !prevState)}
          />
          <img
            src={likedOnly ? onCircle : offCircle}
            alt="checkbox icon"
            className="checkbox-icon"
          />
          liked only
        </label>
        {/*<div className="search"></div>*/}
      </div>
      <div className="main-wrapper">
        <div className="workouts-list-wrapper">
          {filteredWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} myUserId={userId}/>
          ))}
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
