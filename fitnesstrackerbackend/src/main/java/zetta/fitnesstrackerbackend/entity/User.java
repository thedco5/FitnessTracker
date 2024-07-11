package zetta.fitnesstrackerbackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import zetta.fitnesstrackerbackend.vo.Gender;

import java.util.UUID;

@Entity(name = "user")
@Table(name = "user", schema = "zettafit")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @Column(updatable = false, nullable = false)
    private UUID id;

    @Column
    private String name;

    @Column(unique = true)
    private String username;

    @Column(unique = true)
    private String email;

    @Column
    private int exercisesFinished;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "image_id", referencedColumnName = "id")
    private Image image;

}