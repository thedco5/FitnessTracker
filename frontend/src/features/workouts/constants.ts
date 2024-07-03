import { Workout } from "./types.ts";

export const workoutMockup: Workout[] = [
    {
        image: "https://www.shape.com/thmb/CFivFyk4E0TwkElEkeJj0Ha0Fi8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/triceps-workout-with-weights-promo-9760ad7e63174e928729b04780e3ccc1.jpg",
        id: "w1",
        name: "workout1",
        createdBy: "Alex",
        likes: ["userId1", "userId2", "userId3"],
        exercises: ["1", "2"]
    },
    {
        image: "https://img-b.udemycdn.com/course/480x270/5317834_e6a7_4.jpg",
        id: "w2",
        name: "workout2",
        createdBy: "789",
        likes: ["userId4", "userId5", "userId3", "userId7"],
        exercises: ["2", "1", "3"]
    },
    {
        image: "https://img-b.udemycdn.com/course/480x270/5317834_e6a7_4.jpg",
        id: "w3",
        name: "workout3",
        createdBy: "33227",
        likes: ["userId2", "userId6"],
        exercises: ["3"]
    }
];
