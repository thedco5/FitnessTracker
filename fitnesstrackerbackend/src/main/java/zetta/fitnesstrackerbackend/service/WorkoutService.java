package zetta.fitnesstrackerbackend.service;

import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import zetta.fitnesstrackerbackend.dto.workout.UpdateWorkoutDTO;
import zetta.fitnesstrackerbackend.dto.workout.WorkoutDTO;

import java.util.List;
import java.util.UUID;

public interface WorkoutService {

    ResponseEntity<String> addWorkout(WorkoutDTO workoutDTO, JwtAuthenticationToken token);
    ResponseEntity<WorkoutDTO> getWorkout(UUID id, JwtAuthenticationToken token);
    ResponseEntity<WorkoutDTO> getWorkout(UUID id);
    ResponseEntity<String> updateWorkout(UUID id, UpdateWorkoutDTO workoutDTO, JwtAuthenticationToken token);
    ResponseEntity<String> deleteWorkout(UUID id, JwtAuthenticationToken token);

    ResponseEntity<List<WorkoutDTO>> getPublicWorkouts(int page);
    ResponseEntity<List<WorkoutDTO>> getPrivateWorkouts(UUID id, int page);
    ResponseEntity<List<WorkoutDTO>> getPublicAndPrivateWorkouts(UUID id, int page);

    ResponseEntity<List<WorkoutDTO>> getWorkouts(JwtAuthenticationToken token, int page);
    ResponseEntity<List<WorkoutDTO>> getAllWorkouts(int page);

}