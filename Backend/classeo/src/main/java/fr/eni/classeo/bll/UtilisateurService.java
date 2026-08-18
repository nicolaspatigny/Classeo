package fr.eni.classeo.bll;

import fr.eni.classeo.bo.Utilisateur;
import fr.eni.classeo.dto.UtilisateurDto;
import fr.eni.classeo.dto.UtilisateurPostDto;

import java.util.List;

public interface UtilisateurService {

    List<UtilisateurDto> findAll();

    Utilisateur getUserById(Integer id);

    void addUtilisateur(UtilisateurPostDto utilisateur);

    void updateUtilisateur(Integer id, UtilisateurPostDto utilisateur);
}