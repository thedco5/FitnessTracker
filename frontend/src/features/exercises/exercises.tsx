import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { ExerciseCard } from "./exercise";
import { Modal } from './modalx';
import { useNavigate } from 'react-router-dom';
import './card.css';
import './modalx.css';
import './searchbar.css';
import { Exercise, ExercisesProps, FormData } from './types';
import add from "../../Images/add.svg";
import hover from "../../Images/hover.svg";
import { getAccessToken } from '../../auth';

export const Exercises: React.FC<ExercisesProps> = ({ isSignedIn }) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    image: null,
    caloriesPerMinute: 0,
    visibility: 'public',
    type: 'time'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchExercises();
  }, [navigate]);

  const fetchExercises = async () => {
    try {
      const token = getAccessToken();
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      let apiUrl = 'http://localhost:8080/api/exercise/public';

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        apiUrl = 'http://localhost:8080/api/exercise';
      }

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: headers,
      });

      if (response.ok) {
        const data = await response.json();
        setExercises(data);
      } else if (response.status === 401) {
        console.error('Unauthorized: Please log in again.');
        navigate('/login');
      } else {
        const errorText = await response.text();
        console.error(`Failed to fetch exercises: ${errorText}`);
      }
    } catch (error) {
      console.error(`Failed to fetch exercises: ${error}`);
    }
  };

  useEffect(() => {
    setFilteredExercises(exercises.filter(exercise =>
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  }, [exercises, searchTerm]);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.image) return;

    const newExercise: Exercise = {
      id: (exercises.length + 1).toString(),
      name: formData.name,
      description: formData.description,
      image: formData.image,
      caloriesPerMinute: formData.caloriesPerMinute,
      visibility: formData.visibility,
      type: formData.type
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
      caloriesPerMinute: 0,
      visibility: 'public',
      type: 'time'
    });
    closeModal();
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
    navigate('/workouts', { state: { selectedExercises } });
  };

  return (
    <div className="gray-bg">
      {isSignedIn && (
        <div className="main-wrapper">
          <div className="buttons-container">
            <button className="add-exercise-button" onClick={openModal}>
              <img src={add} alt="add" className="default-image" />
              <img src={hover} alt="add-hover" className="hover-image" />
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
      <div className="main-wrapper">
        <div className="cards-container">
          {filteredExercises.map(el => (
            <ExerciseCard
              {...el} 
              likes={0}
              key={el.id}
              isSelected={selectedExercises.some(ex => ex.id === el.id)}
              image={el?.image?.data}
              onClick={() => handleCardClick(el)}
            />
          ))}
        </div>
      </div>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleImageChange={handleImageChange}
        fetchExercises={fetchExercises}
        formData={formData}
      />
    </div>
  );
};

export default Exercises;
