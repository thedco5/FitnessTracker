package zetta.fitnesstrackerbackend.service;

import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import zetta.fitnesstrackerbackend.dto.exercise.ExerciseDTO;
import zetta.fitnesstrackerbackend.dto.exercise.UpdateExerciseDTO;

import java.util.List;
import java.util.UUID;

public interface ExerciseService {

    ResponseEntity<String> addExercise(ExerciseDTO exerciseDTO, JwtAuthenticationToken token);
    ResponseEntity<ExerciseDTO> getExercise(UUID id, JwtAuthenticationToken token);
    ResponseEntity<String> updateExercise(UUID id, UpdateExerciseDTO exerciseDTO, JwtAuthenticationToken token);
    ResponseEntity<String> deleteExercise(UUID id, JwtAuthenticationToken token);

    ResponseEntity<List<ExerciseDTO>> getPublicExercises(int page);
    ResponseEntity<List<ExerciseDTO>> getPrivateExercises(UUID authorId, int page);
    ResponseEntity<List<ExerciseDTO>> getPublicAndPrivateExercises(UUID authorId, int page);

    ResponseEntity<List<ExerciseDTO>> getAllExercises(int page);
    ResponseEntity<List<ExerciseDTO>> getExercises(JwtAuthenticationToken token, int page);

}