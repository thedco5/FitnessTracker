package zetta.fitnesstrackerbackend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import zetta.fitnesstrackerbackend.entity.SavedWorkout;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface SavedWorkoutRepository extends JpaRepository<SavedWorkout, UUID> {

    Optional<SavedWorkout> findByWorkoutIdAndAuthorId(UUID id, UUID authorId);
    Page<SavedWorkout> findByAuthorIdOrderByTimestampDesc(UUID authorId, Pageable pageable);

}