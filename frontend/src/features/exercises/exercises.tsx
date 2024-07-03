
import React, { useState } from 'react';
import { exercisesMockup } from "./constants";
import { ExerciseCard } from "./exercise";
import { Modal } from './modalx';
import './card.css';
import './modalx.css'; 

const addExerciseToDatabase = async (exercise) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ success: true, data: exercise }), 500);
    });
};

export const Exercises = ({ isSignedIn }) => {
    const [exercises, setExercises] = useState(exercisesMockup);
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

        const newExercise = {
            id: (exercises.length + 1).toString(),
            name: formData.name,
            description: formData.description,
            image: imageUrl, 
            calories: formData.calories, 
            duration: formData.duration, 
            durationType: formData.durationType, 
            difficulty: formData.difficulty, 
            visibility: formData.visibility, 
            type: 'weight', 
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

    return (
        <div>
            {isSignedIn && (
                <button className="add-exercise-button" onClick={openModal}>Add Exercise</button>
            )}
            <div className="cards-container">
                {exercises.map(el => <ExerciseCard key={el.id} {...el} calories={el.calories} duration={el.duration} durationType={el.durationType} difficulty={el.difficulty} visibility={el.visibility} />)}
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
