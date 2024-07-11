package zetta.fitnesstrackerbackend.service;

import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import zetta.fitnesstrackerbackend.dto.like.WorkoutLikeDTO;

import java.util.List;
import java.util.UUID;

public interface LikeService {

    ResponseEntity<String> likeWorkout(UUID id, JwtAuthenticationToken token);
    ResponseEntity<String> unlikeWorkout(UUID id, JwtAuthenticationToken token);

    ResponseEntity<List<WorkoutLikeDTO>> getLikedWorkouts(int page, JwtAuthenticationToken token);

}