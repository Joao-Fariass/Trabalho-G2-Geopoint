package br.com.geopoint.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public record PointRequest(

    @NotBlank(message = "O nome é obrigatório.")
    @Size(max = 100, message = "O nome deve ter no máximo 100 caracteres.")
    String name,

    @Size(max = 255, message = "A descrição deve ter no máximo 255 caracteres.")
    String description,

    @NotNull(message = "A latitude é obrigatória.")
    @DecimalMin(value = "-90", message = "A latitude deve estar entre -90 e 90.")
    @DecimalMax(value = "90", message = "A latitude deve estar entre -90 e 90.")
    BigDecimal latitude,

    @NotNull(message = "A longitude é obrigatória.")
    @DecimalMin(value = "-180", message = "A longitude deve estar entre -180 e 180.")
    @DecimalMax(value = "180", message = "A longitude deve estar entre -180 e 180.")
    BigDecimal longitude
) {}
