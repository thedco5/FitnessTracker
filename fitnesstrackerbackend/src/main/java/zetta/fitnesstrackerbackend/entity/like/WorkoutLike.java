package zetta.fitnesstrackerbackend.entity.like;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import zetta.fitnesstrackerbackend.entity.Workout;

@EqualsAndHashCode(callSuper = true)
@Entity(name = "workout_like")
@Table(name = "workout_like", schema = "zettafit")
@Data
public class WorkoutLike extends Like {

    @ManyToOne
    @JoinColumn(name = "workout_id")
    private Workout workout;

}