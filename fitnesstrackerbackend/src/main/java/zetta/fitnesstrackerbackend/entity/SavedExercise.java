package zetta.fitnesstrackerbackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "saved")
@Table(name = "saved", schema = "zettafit")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SavedExercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private User author;

    @ManyToOne
    @JoinColumn(name = "exercise_id")
    private Exercise exercise;

}