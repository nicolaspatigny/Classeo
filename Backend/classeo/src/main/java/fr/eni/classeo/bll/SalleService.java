package fr.eni.classeo.bll;

import fr.eni.classeo.bo.Salle;
import fr.eni.classeo.dto.SalleDto;

import java.util.List;

public interface SalleService {



    List<SalleDto> findAllSalles();

    SalleDto findByIdSalle(Integer id);
}
