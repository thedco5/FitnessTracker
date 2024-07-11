package zetta.fitnesstrackerbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import zetta.fitnesstrackerbackend.entity.ExerciseOrderPerWorkout;

import java.util.UUID;

@Repository
public interface ExerciseOrderPerWorkoutRepository extends JpaRepository<ExerciseOrderPerWorkout, UUID> {

    void deleteByWorkoutId(UUID id);

}