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

