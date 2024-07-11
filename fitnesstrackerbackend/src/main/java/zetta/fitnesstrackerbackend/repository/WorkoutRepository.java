package zetta.fitnesstrackerbackend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import zetta.fitnesstrackerbackend.entity.Workout;
import zetta.fitnesstrackerbackend.vo.Visibility;

import java.util.UUID;

@Repository
public interface WorkoutRepository extends JpaRepository<Workout, UUID> {

    Page<Workout> findByOrderByTimestampDesc(Pageable pageable);

    Page<Workout> findByVisibilityOrderByTimestampDesc(Visibility visibility, Pageable pageable);
    Page<Workout> findByVisibilityAndAuthorIdOrderByTimestampDesc(Visibility visibility, UUID authorId, Pageable pageable);

    Page<Workout> findByVisibilityOrVisibilityAndAuthorIdOrderByTimestampDesc(Visibility visibility, Visibility visibility2, UUID authorId, Pageable pageable);

}