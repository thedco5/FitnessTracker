package zetta.fitnesstrackerbackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "exercise_workout")
@Table(name = "exercise_workout", schema = "zettafit")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseOrderPerWorkout {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private int order;

    @ManyToOne
    @JoinColumn(name = "exercise_id")
    private Exercise exercise;

    @ManyToOne
    @JoinColumn(name = "workout_id")
    private Workout workout;

}