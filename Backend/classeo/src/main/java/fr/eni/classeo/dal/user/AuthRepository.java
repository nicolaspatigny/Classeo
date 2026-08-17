package fr.eni.classeo.dal.user;

import fr.eni.classeo.bo.Auth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface AuthRepository extends JpaRepository<Auth, Integer> {

    @Query("""
        SELECT a
        FROM Auth a
        JOIN FETCH a.userId
        WHERE a.login = :login
    """)
    Optional<Auth> findByLoginWithUser(String login);
}