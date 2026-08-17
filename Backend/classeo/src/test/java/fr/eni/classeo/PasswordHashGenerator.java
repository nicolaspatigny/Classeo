package fr.eni.classeo;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordHashGenerator {

    public static void main(String[] args) {

        BCryptPasswordEncoder encoder =
                new BCryptPasswordEncoder();

        String password = "password";

        String hash = encoder.encode(password);

        System.out.println("Mot de passe : " + password);
        System.out.println("Hash BCrypt  : " + hash);
    }
}