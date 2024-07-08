import { v4 as uuidv4 } from 'uuid';
import { Workout } from "./types.ts";

export const workoutMockup: Workout[] = [
    {
        image: "https://www.shape.com/thmb/CFivFyk4E0TwkElEkeJj0Ha0Fi8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/triceps-workout-with-weights-promo-9760ad7e63174e928729b04780e3ccc1.jpg",
        id: uuidv4(),
        name: "workout1",
        createdBy: "Alex",
        likes: ["userId1", "userId2", "userId3"],
        Favorites: true,
        duration: 50, // Примерное время в минутах
        calories: 1450, // Примерное количество калорий, сожженных за тренировку
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
        id: "w2",
        name: "workout2",
        createdBy: "789",
        likes: ["userId4", "userId5", "userId3", "userId7"],
        Favorites: false,
        duration: 30, // Примерное время в минутах
        calories: 1200, // Примерное количество калорий, сожженных за тренировку
        description: "This workout is designed to challenge your body and improve your fitness levels. It includes a variety of exercises targeting different muscle groups to ensure a comprehensive workout. Suitable for all fitness levels, this routine will help you build strength, increase endurance, and enhance flexibility. Remember to stay hydrated and take breaks as needed. Let's get moving and achieve your fitness goals together!",
        exercises: [
            {id: uuidv4(), repeat: 2, time: 5, exId: "1"},
            {id: uuidv4(), repeat: 2, time: 5, exId: "1"},
        ]
    },
    {
        image: "https://img-b.udemycdn.com/course/480x270/5317834_e6a7_4.jpg",
        id: "w3",
        name: "workout3",
        createdBy: "33227",
        likes: ["userId2", "userId6"],
        Favorites: true,
        duration: 60, // Примерное время в минутах
        calories: 1800, // Примерное количество калорий, сожженных за тренировку
        description: "This workout is designed to challenge your body and improve your fitness levels. It includes a variety of exercises targeting different muscle groups to ensure a comprehensive workout. Suitable for all fitness levels, this routine will help you build strength, increase endurance, and enhance flexibility. Remember to stay hydrated and take breaks as needed. Let's get moving and achieve your fitness goals together!",
        exercises: [
            {id: uuidv4(), repeat: 0, time: 5, exId: "1"},
            {id: uuidv4(), repeat: 2, time: 0, exId: "1"},
            {id: uuidv4(), repeat: 7, time: 0, exId: "1"},
            {id: uuidv4(), repeat: 0, time: 45, exId: "1"},
        ]
    }
];