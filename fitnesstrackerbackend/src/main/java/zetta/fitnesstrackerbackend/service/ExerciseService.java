package zetta.fitnesstrackerbackend.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import zetta.fitnesstrackerbackend.dto.exercise.ExerciseDTO;

import java.util.List;

public interface ExerciseService {

    ResponseEntity<List<ExerciseDTO>> getPublicExercises();

}