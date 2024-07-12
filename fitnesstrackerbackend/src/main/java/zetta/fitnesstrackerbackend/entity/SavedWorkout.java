package zetta.fitnesstrackerbackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity(name = "saved")
@Table(name = "saved", schema = "zettafit")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SavedWorkout {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false)
    private UUID id;

    @Column
    @CreationTimestamp
    private Instant timestamp;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private User author;

    @ManyToOne
    @JoinColumn(name = "workout_id")
    private Workout workout;

}