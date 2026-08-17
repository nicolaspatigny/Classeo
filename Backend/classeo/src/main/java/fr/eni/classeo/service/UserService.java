package fr.eni.classeo.service;

import fr.eni.classeo.bo.Utilisateur;
import fr.eni.classeo.dal.user.UtilisateurRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UtilisateurRepository utilisateurRepository;

    public UserService(UtilisateurRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;
    }

    public List<Utilisateur> getAllUsers() {
        return utilisateurRepository.findAll();
    }

    public Utilisateur getUserById(Integer id) {
        return utilisateurRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Utilisateur introuvable : " + id
                        )
                );
    }
}