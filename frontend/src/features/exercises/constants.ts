// src/constants.ts
import { Exercise } from "./types";
import armPic from "./images/arm.jpeg";
import legPic from "./images/leg.jpg";
import ranPic from "./images/run.jpg";

export const exercisesMockup: Exercise[] = [
    {
        id: '1',
        name: 'Physical Fitness',
        image: armPic,
        type: 'weight',
        description: 'Building strength and endurance',
        caloriesPerMinute: 500,
        calculatedCalories: 0,
        calculatedTime: 0,
        duration: '30',
        durationType: 'minutes',
        visibility: 'public'
    },
    {
        id: '2',
        name: 'Weight Gain',
        image: legPic,
        type: 'weight',
        description: 'Increasing muscle mass',
        caloriesPerMinute: 600,
        calculatedCalories: 0,
        calculatedTime: 0,
        duration: '45',
        durationType: 'minutes',
        difficulty: 'hard',
        visibility: 'private'
    },
    {
        id: '3',
        name: 'Strength Training',
        image: ranPic,
        type: 'time',
        description: 'Enhancing muscle power',
        caloriesPerMinute: 450,
        calculatedCalories: 0,
        calculatedTime: 0,
        duration: '20',
        durationType: 'minutes',
        difficulty: 'easy',
        visibility: 'public'
        
    },
];

