package zetta.fitnesstrackerbackend.entity.like;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity(name = "exercise_like")
@Table(name = "exercise_like", schema = "zettafit")
@Data
@EqualsAndHashCode(callSuper = true)
public class ExerciseLike extends Like { }