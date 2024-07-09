package zetta.fitnesstrackerbackend.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import zetta.fitnesstrackerbackend.dto.exercise.ExerciseDTO;

import java.util.List;

@Service
public class ExerciseServiceImpl implements ExerciseService {

    @Override
    public ResponseEntity<List<ExerciseDTO>> getPublicExercises() {
        return null;
    }

}