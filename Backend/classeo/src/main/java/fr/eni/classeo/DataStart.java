package fr.eni.classeo;

import fr.eni.classeo.bo.Utilisateur;
import fr.eni.classeo.dal.user.UtilisateurRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataStart {

    @Bean
    CommandLineRunner initDatabase(
            UtilisateurRepository utilisateurRepository,
            PasswordEncoder passwordEncoder
    ) {
        return args -> {
            Utilisateur user = Utilisateur.builder()
                    .login("test")
                    .password(passwordEncoder.encode("password"))
                    .nom("Test")
                    .prenom("User")
                    .authority("ROLE_USER")
                    .build();

            utilisateurRepository.save(user);
        };
    }
}