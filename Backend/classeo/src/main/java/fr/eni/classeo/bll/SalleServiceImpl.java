package fr.eni.classeo.bll;

import fr.eni.classeo.dal.SalleRepository;
import fr.eni.classeo.dto.SalleDto;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class SalleServiceImpl implements SalleService {

    private SalleRepository salleRepository;

    @Override
    public List<SalleDto> findAllSalles() {
        return salleRepository.findAll().stream()
                .map(salle -> new SalleDto(salle.getId(), salle.getNom()))
                .toList();
    }

    @Override
    public SalleDto findByIdSalle(Integer id) {
        return salleRepository.findById(id)
                .map(salle -> new SalleDto(salle.getId(), salle.getNom()))
                .orElseThrow(() -> new EntityNotFoundException("Salle non trouvée"));
    }
}
