// src/types.ts
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
    likes:number;
}

export interface Comment {
    id: string;
    createdBy: string;
    value: string;
}
