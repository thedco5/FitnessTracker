package zetta.fitnesstrackerbackend.service;

import org.springframework.http.ResponseEntity;
import zetta.fitnesstrackerbackend.dto.comment.CommentDTO;

import java.util.List;
import java.util.UUID;

public interface CommentService {

    ResponseEntity<String> addComment(CommentDTO commentDTO, UUID workoutId, UUID authorId);
    ResponseEntity<List<CommentDTO>> getComments(UUID workoutId);

}