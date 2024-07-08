import { v4 as uuidv4 } from 'uuid';
import {Workout} from "./types.ts";

export const workoutMockup: Workout[] = [
    {
        image: "https://www.shape.com/thmb/CFivFyk4E0TwkElEkeJj0Ha0Fi8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/triceps-workout-with-weights-promo-9760ad7e63174e928729b04780e3ccc1.jpg",
        id: '48d7864d-ea5f-49f2-99db-8efc75b9481a',
        name: "workout1",
        createdBy: "Alex",
        likes: ["userId1", "userId2", "userId3"],
        totalCalories: 50,
        totalTime: 1450,
        description: "This workout is designed to challenge your body and improve your fitness levels. It includes a variety of exercises targeting different muscle groups to ensure a comprehensive workout. Suitable for all fitness levels, this routine will help you build strength, increase endurance, and enhance flexibility. Remember to stay hydrated and take breaks as needed. Let's get moving and achieve your fitness goals together!",
        exercises: [
            {id: uuidv4(), repeat: 2, time: 5, exId: "1"},
            {id: uuidv4(), repeat: 2, time: 5, exId: "2"},
            {id: uuidv4(), repeat: 2, time: 5, exId: "3"},
            {id: uuidv4(), repeat: 2, time: 5, exId: "2"},
            {id: uuidv4(), repeat: 2, time: 5, exId: "1"},
            {id: uuidv4(), repeat: 2, time: 5, exId: "2"},
            {id: uuidv4(), repeat: 2, time: 5, exId: "2"},
            {id: uuidv4(), repeat: 2, time: 5, exId: "2"},
            {id: uuidv4(), repeat: 2, time: 5, exId: "2"},
        ],
    },
    {
        image: "https://img-b.udemycdn.com/course/480x270/5317834_e6a7_4.jpg",
        id: '6bc4a3f7-725c-4c47-9acc-970154c6e4a8',
        name: "workout2",
        createdBy: "789",
        likes: ["userId4", "userId5", "userId3", "userId7"],
        totalCalories: 50,
        totalTime: 1450,
        description: "This workout is designed to challenge your body and improve your fitness levels. It includes a variety of exercises targeting different muscle groups to ensure a comprehensive workout. Suitable for all fitness levels, this routine will help you build strength, increase endurance, and enhance flexibility. Remember to stay hydrated and take breaks as needed. Let's get moving and achieve your fitness goals together!",
        exercises: [
            {id: uuidv4(), repeat: 2, time: 5, exId: "1"},
            {id: uuidv4(), repeat: 2, time: 5, exId: "1"},
        ]
    },
    {
        image: "https://img-b.udemycdn.com/course/480x270/5317834_e6a7_4.jpg",
        id: '688400c1-f161-42b4-81f7-3336369645b9',
        name: "workout3",
        createdBy: "33227",
        likes: ["userId2", "userId6"],
        totalCalories: 50,
        totalTime: 1450,
        description: "This workout is designed to challenge your body and improve your fitness levels. It includes a variety of exercises targeting different muscle groups to ensure a comprehensive workout. Suitable for all fitness levels, this routine will help you build strength, increase endurance, and enhance flexibility. Remember to stay hydrated and take breaks as needed. Let's get moving and achieve your fitness goals together!",
        exercises: [
            {id: uuidv4(), repeat: 0, time: 5, exId: "1"},
            {id: uuidv4(), repeat: 2, time: 0, exId: "1"},
            {id: uuidv4(), repeat: 7, time: 0, exId: "1"},
            {id: uuidv4(), repeat: 0, time: 45, exId: "1"},
        ]
    }
];