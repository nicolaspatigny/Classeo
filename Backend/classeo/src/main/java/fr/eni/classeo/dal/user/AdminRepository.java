package fr.eni.classeo.dal.user;

import fr.eni.classeo.bo.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin,Integer> {
}
