package br.com.geopoint.controller;

import br.com.geopoint.dto.PointRequest;
import br.com.geopoint.dto.PointResponse;
import br.com.geopoint.service.PointService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/points")
public class PointController {

    private final PointService service;

    public PointController(PointService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PointResponse criar(@Valid @RequestBody PointRequest request) {
        return service.criar(request);
    }

    @GetMapping
    public List<PointResponse> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public PointResponse buscar(@PathVariable UUID id) {
        return service.buscar(id);
    }

    @PutMapping("/{id}")
    public PointResponse atualizar(@PathVariable UUID id, @Valid @RequestBody PointRequest request) {
        return service.atualizar(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable UUID id) {
        service.excluir(id);
    }
}
