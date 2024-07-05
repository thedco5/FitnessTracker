CREATE TABLE zettafit.workout (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255),
    description TEXT,
    timesFinished INT,
    likes INT,
    calories INT,
    restDuration INT,
    difficulty VARCHAR(255),
    type VARCHAR(255),
    visibility VARCHAR(255),
    gender VARCHAR(255),
    image_id UUID,
    author_id UUID,
    CONSTRAINT fk_image
        FOREIGN KEY(image_id)
        REFERENCES zettafit.image(id),
    CONSTRAINT fk_author
        FOREIGN KEY(author_id)
        REFERENCES zettafit."user"(id)
);