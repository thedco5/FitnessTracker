package zetta.fitnesstrackerbackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import zetta.fitnesstrackerbackend.dto.comment.CommentDTO;
import zetta.fitnesstrackerbackend.entity.Comment;
import zetta.fitnesstrackerbackend.entity.User;
import zetta.fitnesstrackerbackend.entity.Workout;
import zetta.fitnesstrackerbackend.mapper.CommentMapper;
import zetta.fitnesstrackerbackend.repository.CommentRepository;

import java.util.List;
import java.util.UUID;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final CommentMapper commentMapper;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository, CommentMapper commentMapper) {
        this.commentRepository = commentRepository;
        this.commentMapper = commentMapper;
    }

    @Override
    public ResponseEntity<String> addComment(CommentDTO commentDTO, UUID workoutId, UUID authorId) {
        commentRepository.save(
                Comment.builder()
                        .content(commentDTO
                                .getContent())
                        .workout(Workout.builder()
                                .id(workoutId).build())
                        .author(User.builder()
                                .id(authorId).build())
                        .build()
        );
        return ResponseEntity.ok("Successfully commented!");
    }

    @Override
    public ResponseEntity<List<CommentDTO>> getComments(UUID workoutId) {
        return ResponseEntity.ok(commentMapper.toCommentDTO(commentRepository.findByWorkoutIdOrderByTimestampDesc(workoutId)));
    }

}