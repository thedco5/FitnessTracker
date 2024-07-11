package zetta.fitnesstrackerbackend.entity.like;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import zetta.fitnesstrackerbackend.entity.User;

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

}