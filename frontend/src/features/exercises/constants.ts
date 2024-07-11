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
        type: 'time',
        description: 'Building strength and endurance',
        caloriesPerMinute: 500,
        visibility: 'public'
    },
    {
        id: '2',
        name: 'Weight Gain',
        image: legPic,
        type: 'time',
        description: 'Increasing muscle mass',
        caloriesPerMinute: 30,
        visibility: 'private'
    },
    {
        id: '3',
        name: 'Strength Training',
        image: ranPic,
        type: 'time',
        description: 'Enhancing muscle power',
        caloriesPerMinute: 30,
        visibility: 'public'
    },
    {
        id: '4',
        name: 'Strength Training',
        image: ranPic,
        type: 'time',
        description: 'Enhancing muscle power',
        caloriesPerMinute: 30,
        visibility: 'public'
    },
    {
        id: '5',
        name: 'Strength Training',
        image: ranPic,
        type: 'time',
        description: 'Enhancing muscle power',
        caloriesPerMinute: 30,
        visibility: 'public'
    },
];

