package zetta.fitnesstrackerbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import zetta.fitnesstrackerbackend.entity.ExerciseOrderPerWorkout;

import java.util.UUID;
import java.util.List;

@Repository
public interface ExerciseOrderPerWorkoutRepository extends JpaRepository<ExerciseOrderPerWorkout, UUID> {

    List<ExerciseOrderPerWorkout> findByWorkoutIdOrderByPositionAsc(UUID id);
    void deleteByWorkoutId(UUID id);

}