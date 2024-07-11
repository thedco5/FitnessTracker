package zetta.fitnesstrackerbackend.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;
import zetta.fitnesstrackerbackend.dto.user.UserDTO;
import zetta.fitnesstrackerbackend.dto.workout.UpdateWorkoutDTO;
import zetta.fitnesstrackerbackend.dto.workout.WorkoutDTO;
import zetta.fitnesstrackerbackend.entity.Exercise;
import zetta.fitnesstrackerbackend.entity.ExerciseOrderPerWorkout;
import zetta.fitnesstrackerbackend.entity.Workout;
import zetta.fitnesstrackerbackend.mapper.WorkoutMapper;
import zetta.fitnesstrackerbackend.repository.ExerciseOrderPerWorkoutRepository;
import zetta.fitnesstrackerbackend.repository.WorkoutRepository;
import zetta.fitnesstrackerbackend.util.TokenUtil;
import zetta.fitnesstrackerbackend.vo.Visibility;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class WorkoutServiceImpl implements WorkoutService {

    private final int PAGE_SIZE = 8;

    private final WorkoutRepository workoutRepository;
    private final ExerciseOrderPerWorkoutRepository exerciseOrderPerWorkoutRepository;
    private final WorkoutMapper workoutMapper;

    @Autowired
    public WorkoutServiceImpl(WorkoutRepository workoutRepository, ExerciseOrderPerWorkoutRepository exerciseOrderPerWorkoutRepository, WorkoutMapper workoutMapper) {
        this.workoutRepository = workoutRepository;
        this.exerciseOrderPerWorkoutRepository = exerciseOrderPerWorkoutRepository;
        this.workoutMapper = workoutMapper;
    }

    @Override
    public ResponseEntity<String> addWorkout(WorkoutDTO workoutDTO, JwtAuthenticationToken token) {

        workoutDTO.setAuthor(UserDTO
                .builder()
                .id(TokenUtil.getID(token))
                .build());

        Workout workout = workoutMapper.toWorkout(workoutDTO);
        workoutRepository.save(workout);
        if (workoutDTO.getExercises() == null)
            return ResponseEntity.ok("Successfully saved empty workout!");

        for (int i = 0; i < workoutDTO.getExercises().size(); i++) {
            exerciseOrderPerWorkoutRepository.save(
                    ExerciseOrderPerWorkout
                            .builder()
                            .workout(workout)
                            .exercise(
                                    Exercise.builder()
                                            .id(workoutDTO
                                                    .getExercises()
                                                    .get(i)
                                                    .getId())
                                            .build())
                            .build());
        }
        return ResponseEntity.ok("Successfully saved workout!");

    }

    @Override
    public ResponseEntity<WorkoutDTO> getWorkout(UUID id, JwtAuthenticationToken token) {

        Optional<Workout> optionalWorkout = workoutRepository.findById(id);
        if (optionalWorkout.isEmpty())
            return ResponseEntity.notFound().build();

        Workout workout = optionalWorkout.get();
        if (TokenUtil.getRole(token).equals("admin")
                || workout.getVisibility().equals(Visibility.PUBLIC)
                || workout.getVisibility().equals(Visibility.PRIVATE)
                && workout.getAuthor().getId().equals(TokenUtil.getID(token))) {
            return ResponseEntity.ok(workoutMapper.toWorkoutDTO(workout));
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();

    }

    @Override
    public ResponseEntity<WorkoutDTO> getWorkout(UUID id) {

        Optional<Workout> optionalWorkout = workoutRepository.findById(id);
        if (optionalWorkout.isEmpty())
            return ResponseEntity.notFound().build();

        Workout workout = optionalWorkout.get();
        if (workout.getVisibility().equals(Visibility.PUBLIC))
            return ResponseEntity.ok(workoutMapper.toWorkoutDTO(workout));

        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();

    }

    @Override
    @Transactional
    public ResponseEntity<String> updateWorkout(UUID id, UpdateWorkoutDTO workoutDTO, JwtAuthenticationToken token) {

        Optional<Workout> optionalWorkout = workoutRepository.findById(id);
        if (optionalWorkout.isEmpty())
            return ResponseEntity.notFound().build();

        exerciseOrderPerWorkoutRepository.deleteByWorkoutId(id);

        if (workoutDTO.getExercises() != null) {
            for (int i = 0; i < workoutDTO.getExercises().size(); i++) {
                exerciseOrderPerWorkoutRepository.save(
                        ExerciseOrderPerWorkout
                                .builder()
                                .workout(optionalWorkout.get())
                                .exercise(
                                        Exercise.builder()
                                                .id(workoutDTO
                                                        .getExercises()
                                                        .get(i)
                                                        .getId())
                                                .build())
                                .build());
            }
        }

        workoutRepository.save(workoutMapper.updateWorkoutFromDTO(workoutDTO, optionalWorkout.get()));
        return ResponseEntity.ok("Successfully updated workout!");

    }

    @Override
    @Transactional
    public ResponseEntity<String> deleteWorkout(UUID id, JwtAuthenticationToken token) {

        Optional<Workout> optionalWorkout = workoutRepository.findById(id);
        if (optionalWorkout.isEmpty())
            return ResponseEntity.notFound().build();

        Workout workout = optionalWorkout.get();
        if (workout.getVisibility().equals(Visibility.PRIVATE)
                && workout.getAuthor().getId().equals(TokenUtil.getID(token))) {
            exerciseOrderPerWorkoutRepository.deleteByWorkoutId(id);
            workoutRepository.deleteById(id);
            return ResponseEntity.ok("Successfully deleted workout!");
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();

    }

    @Override
    public ResponseEntity<List<WorkoutDTO>> getPublicWorkouts(int page) {
        return ResponseEntity.ok(
                workoutMapper.toWorkoutDTO(
                        workoutRepository.findByVisibilityOrderByTimestampDesc(
                                Visibility.PUBLIC,
                                PageRequest.of(page, PAGE_SIZE)
                        )));
    }

    @Override
    public ResponseEntity<List<WorkoutDTO>> getPrivateWorkouts(UUID id, int page) {
        return ResponseEntity.ok(
                workoutMapper.toWorkoutDTO(
                        workoutRepository.findByVisibilityAndAuthorIdOrderByTimestampDesc(
                                Visibility.PRIVATE,
                                id,
                                PageRequest.of(page, PAGE_SIZE)
                        )));
    }

    @Override
    public ResponseEntity<List<WorkoutDTO>> getPublicAndPrivateWorkouts(UUID id, int page) {
        return ResponseEntity.ok(
                workoutMapper.toWorkoutDTO(
                        workoutRepository.findByVisibilityOrVisibilityAndAuthorIdOrderByTimestampDesc(
                                Visibility.PUBLIC,
                                Visibility.PRIVATE,
                                id,
                                PageRequest.of(page, PAGE_SIZE)
                        )));
    }

    @Override
    public ResponseEntity<List<WorkoutDTO>> getWorkouts(JwtAuthenticationToken token, int page) {
        return "admin".equals(TokenUtil.getRole(token)) ?
                getAllWorkouts(page) :
                getPublicAndPrivateWorkouts(TokenUtil.getID(token), page);
    }

    @Override
    public ResponseEntity<List<WorkoutDTO>> getAllWorkouts(int page) {
        return ResponseEntity.ok(
                workoutMapper.toWorkoutDTO(
                        workoutRepository.findByOrderByTimestampDesc(PageRequest.of(page, PAGE_SIZE))));
    }

}