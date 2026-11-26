package br.com.geopoint.dto;

import br.com.geopoint.model.Point;
import java.math.BigDecimal;
import java.util.UUID;

public record PointResponse(
    UUID id,
    String name,
    String description,
    BigDecimal latitude,
    BigDecimal longitude
) {
    public static PointResponse from(Point p) {
        return new PointResponse(p.getId(), p.getName(), p.getDescription(),
                p.getLatitude(), p.getLongitude());
    }
}
