package zetta.fitnesstrackerbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import zetta.fitnesstrackerbackend.dto.like.WorkoutLikeDTO;
import zetta.fitnesstrackerbackend.dto.workout.WorkoutDTO;
import zetta.fitnesstrackerbackend.entity.like.WorkoutLike;
import zetta.fitnesstrackerbackend.service.LikeService;

import java.util.List;
import java.util.UUID;

@EnableWebMvc
@RestController
@RequestMapping("/api/like")
public class LikeController {

    private final LikeService likeService;

    @Autowired
    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    @PostMapping("/workout/{id}")
    public ResponseEntity<String> like(UUID id, JwtAuthenticationToken token) {
        return likeService.likeWorkout(id, token);
    }

    @DeleteMapping("/workout/{id}")
    public ResponseEntity<String> unlike(UUID id, JwtAuthenticationToken token) {
        return likeService.unlikeWorkout(id, token);
    }

    @GetMapping("/workout")
    public ResponseEntity<List<WorkoutLikeDTO>> getLiked(@RequestParam(defaultValue = "0") int page, JwtAuthenticationToken token) {
        return likeService.getLikedWorkouts(page, token);
    }

}