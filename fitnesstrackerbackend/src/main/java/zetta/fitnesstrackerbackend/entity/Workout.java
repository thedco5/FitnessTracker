package zetta.fitnesstrackerbackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import zetta.fitnesstrackerbackend.vo.Difficulty;
import zetta.fitnesstrackerbackend.vo.DurationType;
import zetta.fitnesstrackerbackend.vo.Visibility;

@Entity(name = "workout")
@Table(name = "workout", schema = "zettafit")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Workout {

    @Id
    @OneToMany(mappedBy = "workout")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private String description;

    @Column
    private int timesFinished;

    @Column
    private int likes;

    @Column
    private int calories;

    @Column
    private int restDuration;

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    @Enumerated(EnumType.STRING)
    private Visibility visibility;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private User author;

}