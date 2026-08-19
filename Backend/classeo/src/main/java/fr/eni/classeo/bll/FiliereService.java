package fr.eni.classeo.bll;

import fr.eni.classeo.bo.Filiere;

import java.util.List;

public interface FiliereService {

    List<Filiere> listeFilieres();

    Filiere filiereById(int id);

    void addFiliere(Filiere filiere);

    void updateFiliere(Integer id, Filiere filiere);

    void deleteFiliere(Integer id);

}
