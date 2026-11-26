package br.com.geopoint.exception;

import java.util.UUID;

public class PointNotFoundException extends RuntimeException {
    public PointNotFoundException(UUID id) {
        super("Ponto não encontrado: " + id);
    }
}
