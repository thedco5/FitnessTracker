CREATE TABLE zettafit.exercise_workout (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    position INT,
    exercise_id UUID,
    workout_id UUID,
    CONSTRAINT fk_exercise
        FOREIGN KEY(exercise_id)
        REFERENCES zettafit.exercise(id),
    CONSTRAINT fk_workout
        FOREIGN KEY(workout_id)
        REFERENCES zettafit.workout(id)
);