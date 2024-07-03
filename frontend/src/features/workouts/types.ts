export interface User {
    name: string;
    email: string;
    id: string;
    trainingProgramsList: string[];
}

export interface Workout {
    id: string;
    name: string;
    createdBy: string;
    exercises: string[];
    likes: string[];
    image: string;
}

export interface Exercise {
    image: string;
    description: string;
    id: string;
    name: string;
    type: "time" | "weight";
    calories: string;
    duration: string;
    durationType: string;
    difficulty: string;
    visibility: string;
}

export interface Comment {
    id: string;
    createdBy: string;
    value: string;
}

