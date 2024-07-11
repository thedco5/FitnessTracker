package zetta.fitnesstrackerbackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import zetta.fitnesstrackerbackend.vo.Difficulty;
import zetta.fitnesstrackerbackend.vo.DurationType;
import zetta.fitnesstrackerbackend.vo.ExerciseType;
import zetta.fitnesstrackerbackend.vo.Visibility;

import java.time.Instant;
import java.util.UUID;

@Entity(name = "exercise")
@Table(name = "exercise", schema = "zettafit")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false)
    private UUID id;

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
    private int duration;

    @Column
    @CreationTimestamp
    private Instant timestamp;

    @Enumerated(EnumType.STRING)
    private DurationType durationType;

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    @Enumerated(EnumType.STRING)
    private ExerciseType type;

    @Enumerated(EnumType.STRING)
    private Visibility visibility;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "image_id", referencedColumnName = "id")
    private Image image;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id")
    private User author;

}