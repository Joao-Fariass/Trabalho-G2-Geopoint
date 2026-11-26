package br.com.geopoint.service;

import br.com.geopoint.dto.PointRequest;
import br.com.geopoint.dto.PointResponse;
import br.com.geopoint.exception.PointNotFoundException;
import br.com.geopoint.model.Point;
import br.com.geopoint.repository.PointRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class PointService {

    private final PointRepository repository;

    public PointService(PointRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public PointResponse criar(PointRequest request) {
        Point ponto = new Point();
        copiarDados(request, ponto);
        return PointResponse.from(repository.save(ponto));
    }

    @Transactional(readOnly = true)
    public List<PointResponse> listar() {
        return repository.findAll().stream().map(PointResponse::from).toList();
    }

    @Transactional(readOnly = true)
    public PointResponse buscar(UUID id) {
        return PointResponse.from(buscarEntidade(id));
    }

    @Transactional
    public PointResponse atualizar(UUID id, PointRequest request) {
        Point ponto = buscarEntidade(id);
        copiarDados(request, ponto);
        return PointResponse.from(repository.save(ponto));
    }

    @Transactional
    public void excluir(UUID id) {
        repository.delete(buscarEntidade(id));
    }

    private Point buscarEntidade(UUID id) {
        return repository.findById(id).orElseThrow(() -> new PointNotFoundException(id));
    }

    private void copiarDados(PointRequest origem, Point destino) {
        destino.setName(origem.name().trim());
        destino.setDescription(origem.description());
        destino.setLatitude(origem.latitude());
        destino.setLongitude(origem.longitude());
    }
}
