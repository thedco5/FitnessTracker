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
        calories: '500',
        duration: '30',
        durationType: 'minutes',
        difficulty: 'medium',
        visibility: 'public'
    },
    {
        id: '2',
        name: 'Weight Gain',
        image: legPic,
        type: 'weight',
        description: 'Increasing muscle mass',
        calories: '600',
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
        calories: '450',
        duration: '20',
        durationType: 'minutes',
        difficulty: 'easy',
        visibility: 'public'
    },
];
