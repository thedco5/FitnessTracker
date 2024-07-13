// src/constants.ts
import { Exercise } from "./types";
import armPic from "./images/arm.jpeg";
import legPic from "./images/leg.jpg";
import ranPic from "./images/run.jpg";
import BarbellRows from  "../../Images/BarbellRows.svg"
import CableChestPress from  "../../Images/CableChestPress.svg"
import HammerCurls from  "../../Images/HammerCurls.svg"
import Plank from  "../../Images/Plank.svg"
import legpress from  "../../Images/legpress.svg"
import TRXsuspensionStraps from  "../../Images/TRXsuspensionstraps.svg"
import TricepDips from  "../../Images/TricepDips.svg"
import PushUps from  "../../Images/PushUps.svg"


export const exercisesMockup: Exercise[] = [
    {
        id: '1',
        name: 'Barbell Rows',
        image: BarbellRows,
        type: 'time',
        description: 'Building strength and endurance',
        caloriesPerMinute: 500,
        visibility: 'public'
    },
    {
        id: '2',
        name: 'Cable Chest Press',
        image: CableChestPress,
        type: 'time',
        description: 'Increasing muscle mass',
        caloriesPerMinute: 300,
        visibility: 'private'
    },
    {
        id: '3',
        name: 'Hammer Curls',
        image: HammerCurls,
        type: 'time',
        description: 'Enhancing muscle power',
        caloriesPerMinute: 200,
        visibility: 'public'
    },
    {
        id: '4',
        name: 'Plank',
        image: Plank,
        type: 'time',
        description: 'Improving core strength',
        caloriesPerMinute: 100,
        visibility: 'public'
    },
    {
        id: '5',
        name: 'Leg Press',
        image: legpress,
        type: 'time',
        description: 'Building lower body strength',
        caloriesPerMinute: 250,
        visibility: 'public'
    },
    {
        id: '6',
        name: 'TRX Suspension Straps',
        image: TRXsuspensionStraps,
        type: 'time',
        description: 'Full body workout',
        caloriesPerMinute: 300,
        visibility: 'public'
    },
    {
        id: '7',
        name: 'Tricep Dips',
        image: TricepDips,
        type: 'time',
        description: 'Strengthening triceps',
        caloriesPerMinute: 150,
        visibility: 'public'
    },
    {
        id: '8',
        name: 'Push Ups',
        image: PushUps,
        type: 'time',
        description: 'Upper body strength',
        caloriesPerMinute: 200,
        visibility: 'public'
    },
];

