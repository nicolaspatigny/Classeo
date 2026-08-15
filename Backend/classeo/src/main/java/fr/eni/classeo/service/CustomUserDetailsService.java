package fr.eni.classeo.service;

import fr.eni.classeo.bo.Auth;
import fr.eni.classeo.dal.user.AuthRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final AuthRepository authRepository;

    public CustomUserDetailsService(AuthRepository authRepository) {
        this.authRepository = authRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String login)
            throws UsernameNotFoundException {

        Auth auth = authRepository.findByLogin(login)
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                "Utilisateur non trouvé : " + login
                        )
                );

        return new User(
                auth.getLogin(),
                auth.getPassword(),
                List.of(
                        new SimpleGrantedAuthority(auth.getAuthority())
                )
        );
    }
}