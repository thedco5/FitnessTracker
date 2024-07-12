import { v4 as uuidv4 } from 'uuid';
import {Workout} from "./types.ts";
import { Exercise, Workout } from "./types.ts";
import workoutArms from "../../Images/trainingArms.svg";
import workoutWithDumbbells from "../../Images/workoutsWithDumbbells.svg";
import workoutLeg from "../../Images/trainingLeg.svg";
import workoutStomach from "../../Images/trainingStomach.svg";

export const workoutMockup: Workout[] = [
    {
        image: workoutArms,
        id: '48d7864d-ea5f-49f2-99db-8efc75b9481a',
        name: "Arms Workout",
        createdBy: "Alex",
        likes: ["userId1", "userId2", "12345"],
        totalCalories: 500,
        totalTime: 30,
        description: "A comprehensive arms workout designed to build strength and endurance.",
        exercises: [
            {id: uuidv4(), repeat: 3, time: 5, exId: "1", calculatedCalories: 150, calculatedTime: 15},
            {id: uuidv4(), repeat: 3, time: 5, exId: "3", calculatedCalories: 90, calculatedTime: 15},
            {id: uuidv4(), repeat: 2, time: 5, exId: "7", calculatedCalories: 60, calculatedTime: 10}
        ],
    },
    {
        image: workoutWithDumbbells,
        id: '6bc4a3f7-725c-4c47-9acc-970154c6e4a8',
        name: "Full Body Workout",
        createdBy: "Jane",
        likes: ["userId4", "userId5", "userId3", "12345"],
        totalCalories: 750,
        totalTime: 45,
        description: "A full body workout using dumbbells to increase overall strength and fitness.",
        exercises: [
            {id: uuidv4(), repeat: 4, time: 5, exId: "2", calculatedCalories: 120, calculatedTime: 20},
            {id: uuidv4(), repeat: 3, time: 5, exId: "6", calculatedCalories: 90, calculatedTime: 15},
            {id: uuidv4(), repeat: 2, time: 5, exId: "8", calculatedCalories: 80, calculatedTime: 10}
        ],
    },
    {
        image: workoutLeg,
        id: '688400c1-f161-42b4-81f7-3336369645b9',
        name: "Leg Workout",
        createdBy: "Sam",
        likes: ["userId2", "userId6"],
        totalCalories: 650,
        totalTime: 40,
        description: "A targeted leg workout to enhance lower body strength and endurance.",
        exercises: [
            {id: uuidv4(), repeat: 3, time: 5, exId: "5", calculatedCalories: 150, calculatedTime: 15},
            {id: uuidv4(), repeat: 2, time: 5, exId: "4", calculatedCalories: 60, calculatedTime: 10},
            {id: uuidv4(), repeat: 3, time: 5, exId: "3", calculatedCalories: 90, calculatedTime: 15}
        ],
    },
    {
        image: workoutStomach,
        id: 'a27b5b6c-8728-4aaf-8e21-31b7e5f6d9a6',
        name: "Core Workout",
        createdBy: "Alex",
        likes: ["userId1", "userId3"],
        totalCalories: 400,
        totalTime: 25,
        description: "A core workout focusing on strengthening the abdominal muscles.",
        exercises: [
            {id: uuidv4(), repeat: 4, time: 5, exId: "4", calculatedCalories: 80, calculatedTime: 20},
            {id: uuidv4(), repeat: 2, time: 5, exId: "8", calculatedCalories: 40, calculatedTime: 10},
            {id: uuidv4(), repeat: 2, time: 5, exId: "6", calculatedCalories: 60, calculatedTime: 10}
        ],
    }
];
