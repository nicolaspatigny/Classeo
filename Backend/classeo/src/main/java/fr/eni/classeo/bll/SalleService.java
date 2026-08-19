package fr.eni.classeo.bll;

import fr.eni.classeo.bo.Salle;

import java.util.List;

public interface SalleService {

    List<Salle> getSalles();

    Salle getSalle(Integer id);
}
