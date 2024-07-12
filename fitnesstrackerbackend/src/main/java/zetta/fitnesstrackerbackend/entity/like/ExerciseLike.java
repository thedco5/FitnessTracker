package zetta.fitnesstrackerbackend.entity.like;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import zetta.fitnesstrackerbackend.entity.Exercise;

@Entity(name = "exercise_like")
@Table(name = "exercise_like", schema = "zettafit")
@Data
@EqualsAndHashCode(callSuper = true)
public class ExerciseLike extends Like {

    @ManyToOne
    @JoinColumn(name = "exercise_id")
    private Exercise exercise;

}