package fr.eni.classeo.bll;

import fr.eni.classeo.bo.Cursus;

import java.util.List;

public interface CursusService {

    List<Cursus> listeCursus();

    Cursus getCursusById(int id);
}
