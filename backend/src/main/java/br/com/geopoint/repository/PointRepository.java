package br.com.geopoint.repository;

import br.com.geopoint.model.Point;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PointRepository extends JpaRepository<Point, UUID> {
}
