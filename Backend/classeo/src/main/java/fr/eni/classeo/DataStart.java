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

            Utilisateur student = Utilisateur.builder()
                    .nom("Student")
                    .prenom("Test")
                    .build();

            Auth studentAuth = Auth.builder()
                    .userId(student)
                    .login("student")
                    .password(passwordEncoder.encode("password"))
                    .authority("ROLE_STUDENT")
                    .build();


            Utilisateur teacher = Utilisateur.builder()
                    .nom("Teacher")
                    .prenom("Test")
                    .build();

            Auth teacherAuth = Auth.builder()
                    .userId(teacher)
                    .login("teacher")
                    .password(passwordEncoder.encode("password"))
                    .authority("ROLE_TEACHER")
                    .build();


            Utilisateur admin = Utilisateur.builder()
                    .nom("Admin")
                    .prenom("Test")
                    .build();

            Auth adminAuth = Auth.builder()
                    .userId(admin)
                    .login("admin")
                    .password(passwordEncoder.encode("password"))
                    .authority("ROLE_ADMINISTRATEUR")
                    .build();



            authRepository.save(adminAuth);
        };
    }
}