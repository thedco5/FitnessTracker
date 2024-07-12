package zetta.fitnesstrackerbackend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;
import zetta.fitnesstrackerbackend.dto.comment.CommentDTO;
import zetta.fitnesstrackerbackend.entity.Comment;

import java.util.List;

@Component
@Mapper(componentModel = "spring")
public interface CommentMapper {

    @Mapping(target = "author.id", ignore = true)
    @Mapping(target = "author.password", ignore = true)
    @Mapping(target = "author.image.id", ignore = true)
    @Mapping(target = "workout", ignore = true)
    CommentDTO toCommentDTO(Comment comment);

    List<CommentDTO> toCommentDTO(List<Comment> comments);

}