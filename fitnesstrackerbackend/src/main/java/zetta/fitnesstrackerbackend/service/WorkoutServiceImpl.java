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
import zetta.fitnesstrackerbackend.mapper.ExerciseMapper;
import zetta.fitnesstrackerbackend.mapper.WorkoutMapper;
import zetta.fitnesstrackerbackend.repository.ExerciseOrderPerWorkoutRepository;
import zetta.fitnesstrackerbackend.repository.SavedWorkoutRepository;
import zetta.fitnesstrackerbackend.repository.WorkoutLikeRepository;
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
    private final WorkoutLikeRepository workoutLikeRepository;
    private final SavedWorkoutRepository savedWorkoutRepository;
    private final WorkoutMapper workoutMapper;
    private final ExerciseMapper exerciseMapper;

    @Autowired
    public WorkoutServiceImpl(WorkoutRepository workoutRepository, ExerciseOrderPerWorkoutRepository exerciseOrderPerWorkoutRepository, WorkoutLikeRepository workoutLikeRepository, SavedWorkoutRepository savedWorkoutRepository, WorkoutMapper workoutMapper, ExerciseMapper exerciseMapper) {
        this.workoutRepository = workoutRepository;
        this.exerciseOrderPerWorkoutRepository = exerciseOrderPerWorkoutRepository;
        this.workoutLikeRepository = workoutLikeRepository;
        this.savedWorkoutRepository = savedWorkoutRepository;
        this.workoutMapper = workoutMapper;
        this.exerciseMapper = exerciseMapper;
    }

    @Transactional
    public WorkoutDTO getExercisesAndOtherToWorkout(WorkoutDTO workoutDTO, UUID id) {

        workoutDTO.setExercises(
                exerciseMapper.toExerciseDTO(
                        exerciseOrderPerWorkoutRepository.findByWorkoutIdOrderByPositionAsc(
                                workoutDTO.getId()).stream()
                                .map(ExerciseOrderPerWorkout::getExercise).toList()));

        workoutDTO.setLiked(workoutLikeRepository
                .findByWorkoutIdAndAuthorId(workoutDTO.getId(), id)
                .isPresent());

        workoutDTO.setSaved(savedWorkoutRepository
                .findByWorkoutIdAndAuthorId(workoutDTO.getId(), id)
                .isPresent());

        return workoutDTO;

    }

    @Transactional
    public List<WorkoutDTO> getExercisesAndOtherToWorkout(List<WorkoutDTO> workoutDTOs, UUID id) {
        workoutDTOs.forEach(workoutDTO -> getExercisesAndOtherToWorkout(workoutDTO, id));
        return workoutDTOs;
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
    @Transactional
    public ResponseEntity<WorkoutDTO> getWorkout(UUID id, JwtAuthenticationToken token) {

        Optional<Workout> optionalWorkout = workoutRepository.findById(id);
        if (optionalWorkout.isEmpty())
            return ResponseEntity.notFound().build();

        Workout workout = optionalWorkout.get();
        if (TokenUtil.getRole(token).equals("admin")
                || workout.getVisibility().equals(Visibility.PUBLIC)
                || workout.getVisibility().equals(Visibility.PRIVATE)
                && workout.getAuthor().getId().equals(TokenUtil.getID(token))) {
            return ResponseEntity.ok(
                    getExercisesAndOtherToWorkout(
                            workoutMapper.toWorkoutDTO(workout),
                            TokenUtil.getID(token)));
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();

    }

    @Override
    @Transactional
    public ResponseEntity<WorkoutDTO> getWorkout(UUID id) {

        Optional<Workout> optionalWorkout = workoutRepository.findById(id);
        if (optionalWorkout.isEmpty())
            return ResponseEntity.notFound().build();

        Workout workout = optionalWorkout.get();
        if (workout.getVisibility().equals(Visibility.PUBLIC))
            return ResponseEntity.ok(
                    getExercisesAndOtherToWorkout(
                            workoutMapper.toWorkoutDTO(workout),
                            null));

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
    @Transactional
    public ResponseEntity<List<WorkoutDTO>> getPublicWorkouts(int page) {
        return ResponseEntity.ok(
                getExercisesAndOtherToWorkout(
                        workoutMapper.toWorkoutDTO(
                            workoutRepository.findByVisibilityOrderByTimestampDesc(
                                    Visibility.PUBLIC,
                                    PageRequest.of(page, PAGE_SIZE)
                            )), null));

    }

    @Override
    @Transactional
    public ResponseEntity<List<WorkoutDTO>> getPrivateWorkouts(UUID id, int page) {
        return ResponseEntity.ok(
                getExercisesAndOtherToWorkout(
                        workoutMapper.toWorkoutDTO(
                            workoutRepository.findByVisibilityAndAuthorIdOrderByTimestampDesc(
                                    Visibility.PRIVATE,
                                    id,
                                    PageRequest.of(page, PAGE_SIZE)
                            )), id));
    }

    @Override
    @Transactional
    public ResponseEntity<List<WorkoutDTO>> getPublicAndPrivateWorkouts(UUID id, int page) {
        return ResponseEntity.ok(
                getExercisesAndOtherToWorkout(
                    workoutMapper.toWorkoutDTO(
                            workoutRepository.findByVisibilityOrVisibilityAndAuthorIdOrderByTimestampDesc(
                                    Visibility.PUBLIC,
                                    Visibility.PRIVATE,
                                    id,
                                    PageRequest.of(page, PAGE_SIZE)
                            )), id));
    }

    @Override
    @Transactional
    public ResponseEntity<List<WorkoutDTO>> getWorkouts(JwtAuthenticationToken token, int page) {
        return "admin".equals(TokenUtil.getRole(token)) ?
                getAllWorkouts(page) :
                getPublicAndPrivateWorkouts(TokenUtil.getID(token), page);
    }

    @Override
    @Transactional
    public ResponseEntity<List<WorkoutDTO>> getAllWorkouts(int page) {
        return ResponseEntity.ok(
                getExercisesAndOtherToWorkout(
                    workoutMapper.toWorkoutDTO(
                            workoutRepository.findByOrderByTimestampDesc(
                                    PageRequest.of(page, PAGE_SIZE))), null));
    }

}