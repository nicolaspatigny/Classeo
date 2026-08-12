package fr.eni.classeo.service;

import fr.eni.classeo.bo.Utilisateur;
import fr.eni.classeo.dal.user.UtilisateurRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UtilisateurRepository utilisateurRepository;

    public CustomUserDetailsService(UtilisateurRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String login)
            throws UsernameNotFoundException {

        Utilisateur utilisateur = utilisateurRepository
                .findById(login)
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                "Utilisateur non trouvé : " + login
                        )
                );

        return new User(
                utilisateur.getLogin(),
                utilisateur.getPassword(),
                List.of(
                        new SimpleGrantedAuthority(
                                utilisateur.getAuthority()
                        )
                )
        );
    }
}