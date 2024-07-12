package zetta.fitnesstrackerbackend.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;
import zetta.fitnesstrackerbackend.dto.exercise.ExerciseDTO;
import zetta.fitnesstrackerbackend.dto.exercise.UpdateExerciseDTO;
import zetta.fitnesstrackerbackend.dto.user.UserDTO;
import zetta.fitnesstrackerbackend.entity.Exercise;
import zetta.fitnesstrackerbackend.mapper.ExerciseMapper;
import zetta.fitnesstrackerbackend.repository.ExerciseRepository;
import zetta.fitnesstrackerbackend.util.TokenUtil;
import zetta.fitnesstrackerbackend.vo.Visibility;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ExerciseServiceImpl implements ExerciseService {

    private final int PAGE_SIZE = 8;

    private final ExerciseRepository exerciseRepository;
    private final ExerciseMapper exerciseMapper;

    @Autowired
    public ExerciseServiceImpl(ExerciseRepository exerciseRepository, ExerciseMapper exerciseMapper) {
        this.exerciseRepository = exerciseRepository;
        this.exerciseMapper = exerciseMapper;
    }

    @Override
    public ResponseEntity<String> addExercise(ExerciseDTO exerciseDTO, JwtAuthenticationToken token) {

        UserDTO userDTO = new UserDTO();
        userDTO.setId(TokenUtil.getID(token));

        exerciseDTO.setAuthor(userDTO);
        exerciseRepository.save(exerciseMapper.toExercise(exerciseDTO));

        return ResponseEntity.ok("Successfully saved exercise!");

    }

    @Override
    public ResponseEntity<String> updateExercise(UUID id, UpdateExerciseDTO exerciseDTO, JwtAuthenticationToken token) {

        Optional<Exercise> optionalExercise = exerciseRepository.findById(id);
        if (optionalExercise.isEmpty())
            return ResponseEntity.notFound().build();

        exerciseRepository.save(exerciseMapper.updateExerciseFromDTO(exerciseDTO, optionalExercise.get()));
        return ResponseEntity.ok("Successfully updated exercise!");

    }

    @Override
    @Transactional
    public ResponseEntity<ExerciseDTO> getExercise(UUID id, JwtAuthenticationToken token) {

        Optional<Exercise> optionalExercise = exerciseRepository.findById(id);
        if (optionalExercise.isEmpty())
            return ResponseEntity.notFound().build();

        Exercise exercise = optionalExercise.get();
        if (TokenUtil.getRole(token).equals("admin")
                || exercise.getVisibility().equals(Visibility.PUBLIC)
                || exercise.getVisibility().equals(Visibility.PRIVATE)
                && exercise.getAuthor().getId().equals(TokenUtil.getID(token))) {
            return ResponseEntity.ok(exerciseMapper.toExerciseDTO(exercise));
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();

    }

    @Override
    @Transactional
    public ResponseEntity<ExerciseDTO> getExercise(UUID id) {

        Optional<Exercise> optionalExercise = exerciseRepository.findById(id);
        if (optionalExercise.isEmpty())
            return ResponseEntity.notFound().build();

        Exercise exercise = optionalExercise.get();
        if (exercise.getVisibility().equals(Visibility.PUBLIC))
            return ResponseEntity.ok(exerciseMapper.toExerciseDTO(exercise));

        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();

    }

    @Override
    public ResponseEntity<String> deleteExercise(UUID id, JwtAuthenticationToken token) {

        Optional<Exercise> optionalExercise = exerciseRepository.findById(id);
        if (optionalExercise.isEmpty())
            return ResponseEntity.notFound().build();

        Exercise exercise = optionalExercise.get();
        if (exercise.getVisibility().equals(Visibility.PRIVATE)
                && exercise.getAuthor().getId().equals(TokenUtil.getID(token))) {
            exerciseRepository.deleteById(id);
            return ResponseEntity.ok("Successfully deleted exercise!");
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();

    }

    @Override
    @Transactional
    public ResponseEntity<List<ExerciseDTO>> getExercises(JwtAuthenticationToken token, int page) {
        return "admin".equals(TokenUtil.getRole(token)) ?
                getAllExercises(page) :
                getPublicAndPrivateExercises(TokenUtil.getID(token), page);
    }

    @Override
    @Transactional
    public ResponseEntity<List<ExerciseDTO>> getPublicExercises(int page) {
        return ResponseEntity.ok(
                exerciseMapper.toExerciseDTO(
                        exerciseRepository.findByVisibilityOrderByTimestampDesc(
                                Visibility.PUBLIC,
                                PageRequest.of(page, PAGE_SIZE)
                        )));
    }

    @Override
    @Transactional
    public ResponseEntity<List<ExerciseDTO>> getPrivateExercises(UUID authorId, int page) {
        return ResponseEntity.ok(
                exerciseMapper.toExerciseDTO(
                        exerciseRepository.findByVisibilityAndAuthorIdOrderByTimestampDesc(
                                Visibility.PRIVATE,
                                authorId,
                                PageRequest.of(page, PAGE_SIZE)
                        )));
    }

    @Override
    @Transactional
    public ResponseEntity<List<ExerciseDTO>> getPublicAndPrivateExercises(UUID authorId, int page) {
        return ResponseEntity.ok(
                exerciseMapper.toExerciseDTO(
                        exerciseRepository.findByVisibilityOrVisibilityAndAuthorIdOrderByTimestampDesc(
                                Visibility.PUBLIC,
                                Visibility.PRIVATE,
                                authorId,
                                PageRequest.of(page, PAGE_SIZE)
                        )));
    }

    @Override
    public ResponseEntity<List<ExerciseDTO>> getAllExercises(int page) {
        return ResponseEntity.ok(
                exerciseMapper.toExerciseDTO(
                        exerciseRepository.findByOrderByTimestampDesc(PageRequest.of(page, PAGE_SIZE))));
    }

}