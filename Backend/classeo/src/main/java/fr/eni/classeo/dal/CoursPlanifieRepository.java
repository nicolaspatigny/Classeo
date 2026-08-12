package fr.eni.classeo.dal;


import fr.eni.classeo.bo.CoursPlanifie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoursPlanifieRepository extends JpaRepository<CoursPlanifie, Integer> {
}
