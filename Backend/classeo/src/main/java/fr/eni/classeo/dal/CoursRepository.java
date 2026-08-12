package fr.eni.classeo.dal;

import fr.eni.classeo.bo.Cours;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoursRepository extends JpaRepository<Cours, Integer> {
}
