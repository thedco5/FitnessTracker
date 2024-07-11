package zetta.fitnesstrackerbackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;
import zetta.fitnesstrackerbackend.dto.like.WorkoutLikeDTO;
import zetta.fitnesstrackerbackend.dto.workout.WorkoutDTO;
import zetta.fitnesstrackerbackend.entity.User;
import zetta.fitnesstrackerbackend.entity.Workout;
import zetta.fitnesstrackerbackend.entity.like.WorkoutLike;
import zetta.fitnesstrackerbackend.mapper.LikeMapper;
import zetta.fitnesstrackerbackend.repository.WorkoutLikeRepository;
import zetta.fitnesstrackerbackend.repository.WorkoutRepository;
import zetta.fitnesstrackerbackend.util.TokenUtil;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class LikeServiceImpl implements LikeService {

    private final static int PAGE_SIZE = 8;

    private final WorkoutLikeRepository workoutLikeRepository;
    private final WorkoutRepository workoutRepository;
    private final LikeMapper likeMapper;

    @Autowired
    public LikeServiceImpl(WorkoutLikeRepository workoutLikeRepository, WorkoutRepository workoutRepository, LikeMapper likeMapper) {
        this.workoutLikeRepository = workoutLikeRepository;
        this.workoutRepository = workoutRepository;
        this.likeMapper = likeMapper;
    }

    @Override
    public ResponseEntity<String> likeWorkout(UUID id, JwtAuthenticationToken token) {

        UUID authorId = TokenUtil.getID(token);

        Optional<WorkoutLike> optionalWorkoutLike = workoutLikeRepository.findByIdAndAuthorId(id, authorId);
        if (optionalWorkoutLike.isPresent())
            return ResponseEntity.status(HttpStatus.CONFLICT).build();

        Optional<Workout> optionalWorkout = workoutRepository.findById(id);
        if (optionalWorkout.isEmpty())
            return ResponseEntity.notFound().build();

        Workout workout = optionalWorkout.get();
        workout.setLikes(workout.getLikes() + 1);
        workoutRepository.save(workout);

        WorkoutLike workoutLike = new WorkoutLike();
        workoutLike.setAuthor(User.builder().id(authorId).build());
        workoutLike.setWorkout(workout);
        workoutLikeRepository.save(workoutLike);

        return ResponseEntity.ok("Successfully liked");

    }

    @Override
    public ResponseEntity<String> unlikeWorkout(UUID id, JwtAuthenticationToken token) {

        UUID authorId = TokenUtil.getID(token);

        Optional<WorkoutLike> optionalWorkoutLike = workoutLikeRepository.findByIdAndAuthorId(id, authorId);
        if (optionalWorkoutLike.isEmpty())
            return ResponseEntity.status(HttpStatus.CONFLICT).build();

        Optional<Workout> optionalWorkout = workoutRepository.findById(id);
        if (optionalWorkout.isEmpty())
            return ResponseEntity.notFound().build();

        workoutLikeRepository.delete(optionalWorkoutLike.get());

        Workout workout = optionalWorkout.get();
        workout.setLikes(workout.getLikes() - 1);
        workoutRepository.save(workout);

        return null;
    }

    @Override
    public ResponseEntity<List<WorkoutLikeDTO>> getLikedWorkouts(int page, JwtAuthenticationToken token) {

        List<WorkoutLikeDTO> workoutLikeDTOs = likeMapper.toWorkoutLikeDTO(
                        workoutLikeRepository.findByAuthorId(
                                TokenUtil.getID(token),
                                PageRequest.of(page, PAGE_SIZE)
                        )
        );

        workoutLikeDTOs.forEach(workoutLikeDTO -> workoutLikeDTO.getWorkout().setLiked(true));
        return ResponseEntity.ok(workoutLikeDTOs);

    }

}