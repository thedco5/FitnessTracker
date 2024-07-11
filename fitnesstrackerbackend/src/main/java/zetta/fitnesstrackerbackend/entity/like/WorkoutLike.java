package zetta.fitnesstrackerbackend.entity.like;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Entity(name = "workout_like")
@Table(name = "workout_like", schema = "zettafit")
@Data
public class WorkoutLike extends Like { }