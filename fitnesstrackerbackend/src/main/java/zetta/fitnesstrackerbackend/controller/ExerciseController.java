package zetta.fitnesstrackerbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import zetta.fitnesstrackerbackend.dto.exercise.ExerciseDTO;
import zetta.fitnesstrackerbackend.dto.exercise.UpdateExerciseDTO;
import zetta.fitnesstrackerbackend.service.ExerciseService;
import zetta.fitnesstrackerbackend.util.TokenUtil;

import java.util.List;
import java.util.UUID;

@EnableWebMvc
@RestController
@RequestMapping("/api/exercise")
public class ExerciseController {

    private final ExerciseService exerciseService;

    @Autowired
    public ExerciseController(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

    @PostMapping
    public ResponseEntity<String> createExercise(@RequestBody @Validated ExerciseDTO exerciseDTO, JwtAuthenticationToken token) {
        return exerciseService.addExercise(exerciseDTO, token);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExerciseDTO> getExercise(@PathVariable UUID id, JwtAuthenticationToken token) {
        return exerciseService.getExercise(id, token);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateExercise(@PathVariable UUID id, @RequestBody @Validated UpdateExerciseDTO exerciseDTO, JwtAuthenticationToken token) {
        return exerciseService.updateExercise(id, exerciseDTO, token);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> removeExercise(@PathVariable UUID id, JwtAuthenticationToken token) {
        return exerciseService.deleteExercise(id, token);
    }

    @GetMapping
    public ResponseEntity<List<ExerciseDTO>> getExercises(JwtAuthenticationToken token, @RequestParam(defaultValue = "0") int page) {
        return exerciseService.getExercises(token, page);
    }

    @GetMapping("/public")
    public ResponseEntity<List<ExerciseDTO>> getExercises(@RequestParam(defaultValue = "0") int page) {
        return exerciseService.getPublicExercises(page);
    }

    @GetMapping("/private")
    public ResponseEntity<List<ExerciseDTO>> getOwnExercises(JwtAuthenticationToken token, @RequestParam(defaultValue = "0") int page) {
        return exerciseService.getPrivateExercises(TokenUtil.getID(token), page);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<ExerciseDTO>> getExercisesFiltered(JwtAuthenticationToken token, ExerciseDTO exerciseDTO, @RequestParam(defaultValue = "0") int page) {
        return null;
    }

}