package zetta.fitnesstrackerbackend.service;

import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import zetta.fitnesstrackerbackend.dto.saved.SavedWorkoutDTO;

import java.util.List;
import java.util.UUID;

public interface SavedService {

    ResponseEntity<String> saveWorkout(UUID id, JwtAuthenticationToken token);
    ResponseEntity<String> unsaveWorkout(UUID id, JwtAuthenticationToken token);

    ResponseEntity<List<SavedWorkoutDTO>> getSavedWorkouts(int page, JwtAuthenticationToken token);

}