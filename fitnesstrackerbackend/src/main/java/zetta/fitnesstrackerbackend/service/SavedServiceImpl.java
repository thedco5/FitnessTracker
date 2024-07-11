package zetta.fitnesstrackerbackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;
import zetta.fitnesstrackerbackend.dto.saved.SavedWorkoutDTO;
import zetta.fitnesstrackerbackend.entity.SavedWorkout;
import zetta.fitnesstrackerbackend.entity.User;
import zetta.fitnesstrackerbackend.entity.Workout;
import zetta.fitnesstrackerbackend.mapper.SavedMapper;
import zetta.fitnesstrackerbackend.repository.SavedWorkoutRepository;
import zetta.fitnesstrackerbackend.repository.WorkoutRepository;
import zetta.fitnesstrackerbackend.util.TokenUtil;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class SavedServiceImpl implements SavedService {

    private final static int PAGE_SIZE = 8;

    private final SavedWorkoutRepository savedWorkoutRepository;
    private final WorkoutRepository workoutRepository;
    private final SavedMapper savedMapper;

    @Autowired
    public SavedServiceImpl(SavedWorkoutRepository savedWorkoutRepository, WorkoutRepository workoutRepository, SavedMapper savedMapper) {
        this.savedWorkoutRepository = savedWorkoutRepository;
        this.workoutRepository = workoutRepository;
        this.savedMapper = savedMapper;
    }

    @Override
    public ResponseEntity<String> saveWorkout(UUID id, JwtAuthenticationToken token) {

        UUID authorId = TokenUtil.getID(token);

        Optional<SavedWorkout> optionalSavedWorkout = savedWorkoutRepository.findByWorkoutIdAndAuthorId(id, authorId);
        if (optionalSavedWorkout.isPresent())
            return ResponseEntity.status(HttpStatus.CONFLICT).build();

        Optional<Workout> optionalWorkout = workoutRepository.findById(id);
        if (optionalWorkout.isEmpty())
            return ResponseEntity.notFound().build();

        SavedWorkout savedWorkout = new SavedWorkout();
        savedWorkout.setAuthor(User.builder().id(authorId).build());
        savedWorkout.setWorkout(optionalWorkout.get());
        savedWorkoutRepository.save(savedWorkout);

        return ResponseEntity.ok("Successfully saved");

    }

    @Override
    public ResponseEntity<String> unsaveWorkout(UUID id, JwtAuthenticationToken token) {

        UUID authorId = TokenUtil.getID(token);

        Optional<SavedWorkout> optionalSavedWorkout = savedWorkoutRepository.findByWorkoutIdAndAuthorId(id, authorId);
        if (optionalSavedWorkout.isEmpty())
            return ResponseEntity.status(HttpStatus.CONFLICT).build();

        Optional<Workout> optionalWorkout = workoutRepository.findById(id);
        if (optionalWorkout.isEmpty())
            return ResponseEntity.notFound().build();

        savedWorkoutRepository.delete(optionalSavedWorkout.get());
        return ResponseEntity.ok("Successfully unsaved");

    }

    @Override
    public ResponseEntity<List<SavedWorkoutDTO>> getSavedWorkouts(int page, JwtAuthenticationToken token) {

        List<SavedWorkoutDTO> savedWorkoutDTOS = savedMapper.toSavedWorkoutDTO(
                savedWorkoutRepository.findByAuthorIdOrderByTimestampDesc(
                        TokenUtil.getID(token),
                        PageRequest.of(page, PAGE_SIZE)
                )
        );

        savedWorkoutDTOS.forEach(workoutLikeDTO -> workoutLikeDTO.getWorkout().setSaved(true));
        return ResponseEntity.ok(savedWorkoutDTOS);

    }

}