CREATE TABLE zettafit."user" (
    id UUID PRIMARY KEY,
    name VARCHAR(255),
    username VARCHAR(255),
    email VARCHAR(255),
    exercises_finished INT,
    gender VARCHAR(255),
    image_id UUID,
    CONSTRAINT fk_image
        FOREIGN KEY(image_id)
        REFERENCES zettafit.image(id)
);