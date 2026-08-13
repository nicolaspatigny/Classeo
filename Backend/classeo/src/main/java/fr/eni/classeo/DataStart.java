package fr.eni.classeo;

import fr.eni.classeo.bo.Auth;
import fr.eni.classeo.bo.Utilisateur;
import fr.eni.classeo.dal.user.AuthRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataStart {

    @Bean
    CommandLineRunner initDatabase(
            AuthRepository authRepository,
            PasswordEncoder passwordEncoder
    ) {
        return args -> {

            Utilisateur user = Utilisateur.builder()
                    .nom("Test")
                    .prenom("User")
                    .build();

            Auth auth = Auth.builder()
                    .userId(user)
                    .login("test")
                    .password(passwordEncoder.encode("password"))
                    .authority("ROLE_USER")
                    .build();

            authRepository.save(auth);
        };
    }
}