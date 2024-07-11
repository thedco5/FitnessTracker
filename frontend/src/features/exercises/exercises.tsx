import {useState, useEffect, ChangeEvent, FormEvent} from 'react';
import {exercisesMockup} from "./constants";
import {ExerciseCard} from "./exercise";
import {Modal} from './modalx';
import {useNavigate} from 'react-router-dom';
import './card.css';
import './modalx.css';
import './searchbar.css';
import {Exercise, ExercisesProps} from './types';
import add from "../../Images/add.svg";
import hover from "../../Images/hover.svg";

const addExerciseToDatabase = async (exercise: Exercise): Promise<{ success: boolean, data: Exercise }> => {
  const response = await fetch('https://your-backend-api.com/exercises', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(exercise),
  });

  if (!response.ok) {
    throw new Error('Failed to add exercise to database');
  }

  const data = await response.json();
  return {success: true, data};
};

export const Exercises: React.FC<ExercisesProps> = ({isSignedIn}) => {
  const [exercises, setExercises] = useState<Exercise[]>(exercisesMockup);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
    calories: '',
    duration: '',
    durationType: 'reps',
    difficulty: 'medium',
    visibility: 'public'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    setFilteredExercises(exercises.filter(exercise =>
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  }, [exercises, searchTerm]);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({...formData, image: file});
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.image) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result as string;

      const newExercise: Exercise = {
        id: (exercises.length + 1).toString(),
        name: formData.name,
        description: formData.description,
        image: base64Image,
        calories: formData.calories,
        duration: formData.duration,
        durationType: formData.durationType,
        difficulty: formData.difficulty,
        visibility: formData.visibility,
        type: 'weight',
        likes: 0
      };

      try {
        const response = await addExerciseToDatabase(newExercise);
        if (response.success) {
          setExercises([...exercises, response.data]);
        }
      } catch (error) {
        console.error('Error adding exercise:', error);
      }

      setFormData({
        name: '',
        description: '',
        image: null,
        calories: '',
        duration: '',
        durationType: 'reps',
        difficulty: 'medium',
        visibility: 'public'
      });
      closeModal();
    };

    reader.readAsDataURL(formData.image);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCardClick = (exercise: Exercise) => {
    if (isSignedIn) {
      setSelectedExercises(prevSelected => {
        if (prevSelected.includes(exercise)) {
          return prevSelected.filter(ex => ex.id !== exercise.id);
        } else {
          return [...prevSelected, exercise];
        }
      });
    }
  };

  const handleAddToWorkout = () => {
    navigate('/workouts', {state: {selectedExercises}});
  };

  return (
    <div className="gray-bg">
      {isSignedIn && (
        <div className="main-wrapper">
        <div className="buttons-container">
          <button className="add-exercise-button" onClick={openModal}>
            <img src={add} alt="add" className="default-image"/>
            <img src={hover} alt="add-hover" className="hover-image"/>
          </button>
          {selectedExercises.length > 0 && (
            <button className="add-to-workout-button" onClick={handleAddToWorkout}>
              Add to Workout
            </button>
          )}
        </div>
        </div>

      )}
      <div className="container">
        <input
          type="text"
          placeholder="Search exercises by name..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className="search"></div>
      </div>
      <div className="cards-container">
        {filteredExercises.map(el => (
          <ExerciseCard
            key={el.id}
            isSelected={selectedExercises.some(ex => ex.id === el.id)}
            {...el}
            calories={el.calories}
            duration={el.duration}
            durationType={el.durationType}
            difficulty={el.difficulty}
            onClick={() => handleCardClick(el)}/>
        ))}
      </div>
      <Modal
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
