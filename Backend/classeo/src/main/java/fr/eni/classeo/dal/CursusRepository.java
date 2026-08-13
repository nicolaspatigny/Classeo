package fr.eni.classeo.dal;


import fr.eni.classeo.bo.Cursus;
import org.springframework.data.jpa.repository.JpaRepository;



public interface CursusRepository extends JpaRepository<Cursus, Integer> {
}
