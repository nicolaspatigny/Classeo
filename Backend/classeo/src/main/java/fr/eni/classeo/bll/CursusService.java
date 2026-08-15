package fr.eni.classeo.bll;

import fr.eni.classeo.bo.Cursus;
import fr.eni.classeo.dto.CursusPostDto;

import java.util.List;

public interface CursusService {

    List<Cursus> listeCursus();

    Cursus getCursusById(int id);

    void addCursus(CursusPostDto cursus);
}
