package fr.eni.classeo.bll;

import fr.eni.classeo.bo.Cursus;
import fr.eni.classeo.bo.Filiere;
import fr.eni.classeo.dal.CursusRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class CursusServiceImpl implements CursusService {

    private CursusRepository cursusRepository;

    @Override
    public List<Cursus> listeCursus() {
        return cursusRepository.findAll();
    }

    @Override
    public Cursus getCursusById(int id) {
        if(id <= 0){
            throw new RuntimeException("Identifiant n'existe pas");
        }
        final Optional<Cursus> cursus = cursusRepository.findById(id);
        if(cursus.isPresent()){
            return cursus.get();
        }
        throw new RuntimeException("Aucun cursus ne correspond");
    }
}
