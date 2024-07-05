import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { exercisesMockup } from "./constants";
import { ExerciseCard } from "./exercise";
import { Modal } from './modalx';
import { Exercise, FormData, ExercisesProps } from './types';
import './card.css';
import './modalx.css';
import './searchbar.css';

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
    return { success: true, data };
};

export const Exercises: React.FC<ExercisesProps> = ({ isSignedIn }) => {
    const [exercises, setExercises] = useState<Exercise[]>(exercisesMockup);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState<FormData>({
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
        setFormData({ ...formData, image: file });
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
                likes: 0,
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

        reader.readAsDataURL(formData.image);
    };

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div>
            {isSignedIn && (
                <button className="add-exercise-button" onClick={openModal}>Add Exercise</button>
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
                    <ExerciseCard key={el.id} {...el} calories={el.calories} duration={el.duration} durationType={el.durationType} difficulty={el.difficulty} />
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
