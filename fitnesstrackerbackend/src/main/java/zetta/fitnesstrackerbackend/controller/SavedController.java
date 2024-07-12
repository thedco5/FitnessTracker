package zetta.fitnesstrackerbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import zetta.fitnesstrackerbackend.dto.saved.SavedWorkoutDTO;
import zetta.fitnesstrackerbackend.service.SavedService;

import java.util.List;
import java.util.UUID;

@EnableWebMvc
@RestController
@RequestMapping("/api/save")
public class SavedController {

    private final SavedService savedService;

    @Autowired
    public SavedController(SavedService savedService) {
        this.savedService = savedService;
    }

    @PostMapping("/workout/{id}")
    public ResponseEntity<String> saveWorkout(@PathVariable UUID id, JwtAuthenticationToken token) {
        return savedService.saveWorkout(id, token);
    }

    @DeleteMapping("/workout/{id}")
    public ResponseEntity<String> unsaveWorkout(@PathVariable UUID id, JwtAuthenticationToken token) {
        return savedService.unsaveWorkout(id, token);
    }

    @GetMapping("/workout")
    public ResponseEntity<List<SavedWorkoutDTO>> getSaved(@RequestParam(defaultValue = "0") int page, JwtAuthenticationToken token) {
        return savedService.getSavedWorkouts(page, token);
    }

}