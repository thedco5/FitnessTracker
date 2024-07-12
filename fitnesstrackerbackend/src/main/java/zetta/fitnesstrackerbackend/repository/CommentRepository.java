package zetta.fitnesstrackerbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import zetta.fitnesstrackerbackend.entity.Comment;

import java.util.List;
import java.util.UUID;

@Repository
public interface CommentRepository extends JpaRepository<Comment, UUID> {

    List<Comment> findByWorkoutIdOrderByTimestampDesc(UUID workoutId);

}