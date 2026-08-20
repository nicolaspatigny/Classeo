package fr.eni.classeo.dal;

import fr.eni.classeo.bo.Salle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SalleRepository extends JpaRepository<Salle,Integer> {
}
