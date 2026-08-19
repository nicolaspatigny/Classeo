package fr.eni.classeo.bll;

import fr.eni.classeo.bo.Filiere;
import fr.eni.classeo.dal.FiliereRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class FiliereServiceImpl implements FiliereService {

    private FiliereRepository filiereRepository;

    @Override
    public List<Filiere> listeFilieres() {
        return filiereRepository.findAll();
    }

    @Override
    public Filiere filiereById(int id) {
        if(id <= 0){
            throw new RuntimeException("Identifiant n'existe pas");
        }
        final Optional<Filiere> filiere = filiereRepository.findById(id);
        if(filiere.isPresent()){
            return filiere.get();
        }
        throw new RuntimeException("Aucune filiere ne correspond");
    }

    @Override
    public void addFiliere(Filiere filiere) {
        if(filiere == null){
            throw new RuntimeException("Filiere n'est pas renseignée'");
        }
        try {
            filiereRepository.save(filiere);
        }catch(RuntimeException e){
            throw  new RuntimeException("impossible de sauver"+ filiere);
        }
    }

    @Override
    public void updateFiliere(Integer id, Filiere filiere) {

        Filiere existingFiliere = filiereRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Filiere introuvable : " + id)
                );

        if (filiere == null) {
            throw new RuntimeException("Filiere n'est pas renseignée");
        }

        existingFiliere.setNom(filiere.getNom());

        filiereRepository.save(existingFiliere);
    }

    @Override
    public void deleteFiliere(Integer id) {

        Filiere filiere = filiereRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Filiere introuvable : " + id)
                );

        filiereRepository.delete(filiere);
    }
}
