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
    },
    {
        id: '2',
        name: 'Weight Gain',
        image: legPic,
        type: 'weight',
        description: 'Increasing muscle mass',
    },
    {
        id: '3',
        name: 'Strength Training',
        image: ranPic,
        type: 'time',
        description: 'Enhancing muscle power',
    },
];
