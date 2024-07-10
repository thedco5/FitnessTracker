package zetta.fitnesstrackerbackend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import zetta.fitnesstrackerbackend.entity.Exercise;
import zetta.fitnesstrackerbackend.vo.Visibility;

import java.util.UUID;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, UUID> {

    Page<Exercise> findByVisibility(Visibility visibility, Pageable pageable);
    Page<Exercise> findByVisibilityAndAuthorId(Visibility visibility, UUID authorId, Pageable pageable);

    Page<Exercise> findByVisibilityOrVisibilityAndAuthorId(Visibility visibility, Visibility visibility2, UUID authorId, Pageable pageable);

}