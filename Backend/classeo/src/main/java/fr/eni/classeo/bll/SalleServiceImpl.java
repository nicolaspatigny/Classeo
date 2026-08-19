package fr.eni.classeo.bll;

import fr.eni.classeo.bo.Salle;
import fr.eni.classeo.dal.SalleRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class SalleServiceImpl implements SalleService {

    private SalleRepository salleRepository;

    @Override
    public List<Salle> getSalles() {
        return salleRepository.findAll();
    }

    @Override
    public Salle getSalle(Integer id) {
        return salleRepository.findById(id)
                .orElseThrow(()->new EntityNotFoundException("Salle non trouvée"));
    }
}
