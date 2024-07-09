package zetta.fitnesstrackerbackend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@EnableWebMvc
@RestController
@RequestMapping("/api/exercise")
public class ExerciseController {

    @GetMapping("/")
    public ResponseEntity<String> getAllExercises() {
        return ResponseEntity.ok("");
    }

}