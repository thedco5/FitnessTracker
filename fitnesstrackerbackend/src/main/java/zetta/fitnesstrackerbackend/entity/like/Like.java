package zetta.fitnesstrackerbackend.entity.like;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import zetta.fitnesstrackerbackend.entity.User;
import zetta.fitnesstrackerbackend.entity.Workout;

import java.time.Instant;
import java.util.UUID;

@MappedSuperclass
@Data
public class Like {

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