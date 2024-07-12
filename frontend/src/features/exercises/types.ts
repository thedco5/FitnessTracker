export interface User {
    name: string;
    email: string;
    id: string;
    trainingProgramsList: string[];
}

export interface TrainingProgram {
    id: string;
    name: string;
    createdBy: string;
    exercises: {
        exercise: Exercise;
        repeats: number;
        weight?: number;
        minutes?: number;
    }[];
    likes: string[]; 
}

export interface Exercise {
    id: string;
    name: string;
    description: string;
    image: string | null;
    caloriesPerMinute: number;
    visibility: string;
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
    image: string | null;
    caloriesPerMinute: number;
    visibility: string;
    type: string;
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
