export interface User {
    name: string;
    email: string;
    id: string;
    trainingProgramsList: string[];
}

export interface WorkoutExCard {
    id: string;
    repeat?: number;
    time?: number;
    exId: string;
    calculatedCalories?: number;
    calculatedTime?: number;
}
export interface Workout {
    comments: never[];
    id: string;
    name: string;
    createdBy: string;
    exercises: WorkoutExCard[];
    likes: string[];
    image: string;
    totalCalories: number;
    totalTime: number;
    description: string;
}

export interface Exercise {
    id: string;
    name: string;
    description: string;
    image: string | null;
    calories: string;
    duration: string;
    durationType: string;
    difficulty: string;
    visibility: string;
    likes: number;
    type: string;
}

export interface Comment {
    id: string;
    createdBy: string;
    value: string;
}

export interface FormData {
    name: string;
    description: string;
    image: File | null;
    calories: string;
    duration: string;
    durationType: string;
    difficulty: string;
    visibility: string;
}

export interface ModalProps {
    showModal: boolean;
    closeModal: () => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    formData: FormData;
}

export interface ExercisesProps {
    isSignedIn: boolean;
}
