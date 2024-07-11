package zetta.fitnesstrackerbackend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import zetta.fitnesstrackerbackend.entity.like.WorkoutLike;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface WorkoutLikeRepository extends JpaRepository<WorkoutLike, UUID> {

    Optional<WorkoutLike> findByIdAndAuthorId(UUID id, UUID authorId);
    Page<WorkoutLike> findByAuthorId(UUID authorId, Pageable pageable);

}