package zetta.fitnesstrackerbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import zetta.fitnesstrackerbackend.dto.comment.CommentDTO;
import zetta.fitnesstrackerbackend.service.CommentService;
import zetta.fitnesstrackerbackend.util.TokenUtil;

import java.util.List;
import java.util.UUID;

@EnableWebMvc
@RestController
@RequestMapping("/api/comment")
public class CommentController {

    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/{workoutId}")
    public ResponseEntity<String> addComment(@PathVariable UUID workoutId, @Validated @RequestBody CommentDTO commentDTO, JwtAuthenticationToken token) {
        return commentService.addComment(commentDTO, workoutId, TokenUtil.getID(token));
    }

    @GetMapping("/{workoutId}")
    public ResponseEntity<List<CommentDTO>> getComments(@PathVariable UUID workoutId) {
        return commentService.getComments(workoutId);
    }

}