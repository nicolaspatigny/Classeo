package fr.eni.classeo.dal;

import fr.eni.classeo.bo.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;



public interface PromotionRepository extends JpaRepository<Promotion, Integer> {
}
