package fr.eni.classeo.bll;

import fr.eni.classeo.bo.Cours;

import java.util.List;

public interface CoursService {

    List<Cours> listeCours();

    Cours getCoursById(int id);
}
