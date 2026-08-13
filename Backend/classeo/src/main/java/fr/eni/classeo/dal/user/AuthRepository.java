package fr.eni.classeo.dal.user;

import fr.eni.classeo.bo.Auth;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AuthRepository extends JpaRepository<Auth, Integer> {

    Optional<Auth> findByLogin(String login);
}