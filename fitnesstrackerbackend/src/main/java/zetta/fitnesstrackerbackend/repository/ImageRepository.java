package zetta.fitnesstrackerbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import zetta.fitnesstrackerbackend.entity.Image;

import java.util.UUID;

@Repository
public interface ImageRepository extends JpaRepository<Image, UUID> {



}