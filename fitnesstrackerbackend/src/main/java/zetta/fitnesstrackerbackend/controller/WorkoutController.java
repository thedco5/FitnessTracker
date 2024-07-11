package zetta.fitnesstrackerbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import zetta.fitnesstrackerbackend.dto.workout.UpdateWorkoutDTO;
import zetta.fitnesstrackerbackend.dto.workout.WorkoutDTO;
import zetta.fitnesstrackerbackend.service.WorkoutService;
import zetta.fitnesstrackerbackend.util.TokenUtil;

import java.util.List;
import java.util.UUID;

@EnableWebMvc
@RestController
@RequestMapping("/api/workout")
public class WorkoutController {

    private final WorkoutService workoutService;

    @Autowired
    public WorkoutController(WorkoutService workoutService) {
        this.workoutService = workoutService;
    }

    @PostMapping
    public ResponseEntity<String> createWorkout(@RequestBody @Validated WorkoutDTO workoutDTO, JwtAuthenticationToken token) {
        return workoutService.addWorkout(workoutDTO, token);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkoutDTO> getWorkout(@PathVariable UUID id, JwtAuthenticationToken token) {
        return workoutService.getWorkout(id, token);
    }

    @GetMapping("/{id}/public")
    public ResponseEntity<WorkoutDTO> getWorkout(@PathVariable UUID id) {
        return workoutService.getWorkout(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateWorkout(@PathVariable UUID id, @RequestBody UpdateWorkoutDTO workoutDTO, JwtAuthenticationToken token) {
        return workoutService.updateWorkout(id, workoutDTO, token);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteWorkout(@PathVariable UUID id, JwtAuthenticationToken token) {
        return workoutService.deleteWorkout(id, token);
    }

    @GetMapping
    public ResponseEntity<List<WorkoutDTO>> getWorkouts(JwtAuthenticationToken token, @RequestParam(defaultValue = "0") int page) {
        return workoutService.getWorkouts(token, page);
    }

    @GetMapping("/public")
    public ResponseEntity<List<WorkoutDTO>> getWorkouts(@RequestParam(defaultValue = "0") int page) {
        return workoutService.getPublicWorkouts(page);
    }

    @GetMapping("/private")
    public ResponseEntity<List<WorkoutDTO>> getOwnWorkouts(JwtAuthenticationToken token, @RequestParam(defaultValue = "0") int page) {
        return workoutService.getPrivateWorkouts(TokenUtil.getID(token), page);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<WorkoutDTO>> getWorkoutsFiltered(JwtAuthenticationToken token, @RequestParam(defaultValue = "0") int page) {
        return null;
    }

}