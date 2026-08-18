package fr.eni.classeo.controller;

import fr.eni.classeo.bo.Auth;
import fr.eni.classeo.bo.Eleve;
import fr.eni.classeo.bo.Formateur;
import fr.eni.classeo.bo.InscriptionPromotion;
import fr.eni.classeo.bo.Utilisateur;
import fr.eni.classeo.dal.inscription.InscriptionPromotionRepository;
import fr.eni.classeo.dal.user.AuthRepository;
import fr.eni.classeo.dto.LoginRequest;
import fr.eni.classeo.dto.LoginResponse;
import fr.eni.classeo.dto.UserResponse;
import fr.eni.classeo.security.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final AuthRepository authRepository;
    private final InscriptionPromotionRepository inscriptionPromotionRepository;

    public AuthController(
            AuthenticationManager authenticationManager,
            JwtService jwtService,
            AuthRepository authRepository,
            InscriptionPromotionRepository inscriptionPromotionRepository
    ) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.authRepository = authRepository;
        this.inscriptionPromotionRepository = inscriptionPromotionRepository;
    }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                request.login(),
                                request.password()
                        )
                );

        UserDetails userDetails =
                (UserDetails) authentication.getPrincipal();

        Auth auth = authRepository.findByLoginWithUser(request.login())
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.UNAUTHORIZED,
                                "Utilisateur non trouvé"
                        )
                );

        Utilisateur utilisateur = auth.getUserId();

        String role = convertRole(auth.getAuthority());

        if (!isUserTypeCompatible(request.userType(), role)) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Le type d'utilisateur ne correspond pas au compte"
            );
        }

        UserResponse userResponse =
                buildUserResponse(utilisateur, role);

        String token =
                jwtService.generateToken(userDetails);

        return new LoginResponse(
                token,
                userResponse
        );
    }

    private UserResponse buildUserResponse(
            Utilisateur utilisateur,
            String role
    ) {

        Integer promotionId = null;
        Integer cursusId = null;
        Integer filiereId = null;

        if (utilisateur instanceof Eleve eleve) {

            InscriptionPromotion inscription =
                    inscriptionPromotionRepository
                            .findByEleveIdWithDetails(eleve.getId())
                            .stream()
                            .findFirst()
                            .orElse(null);

            if (inscription != null) {

                promotionId =
                        inscription.getPromotion().getId();

                if (inscription.getPromotion().getCursus() != null) {

                    cursusId =
                            inscription
                                    .getPromotion()
                                    .getCursus()
                                    .getId();

                    if (inscription
                            .getPromotion()
                            .getCursus()
                            .getFiliere() != null) {

                        filiereId =
                                inscription
                                        .getPromotion()
                                        .getCursus()
                                        .getFiliere()
                                        .getId();
                    }
                }
            }
        }

        return new UserResponse(
                utilisateur.getId(),
                utilisateur.getNom(),
                utilisateur.getPrenom(),
                role,
                promotionId,
                cursusId,
                filiereId
        );
    }

    private String convertRole(String authority) {

        return switch (authority) {

            case "ROLE_ELEVE" ->
                    "ELEVE";

            case "ROLE_ENSEIGNANT" ->
                    "ENSEIGNANT";

            case "ROLE_ADMINISTRATEUR" ->
                    "ADMINISTRATEUR";

            default ->
                    throw new ResponseStatusException(
                            HttpStatus.UNAUTHORIZED,
                            "Rôle utilisateur inconnu"
                    );
        };
    }

    private boolean isUserTypeCompatible(
            String userType,
            String role
    ) {
        return userType != null && userType.equals(role);
    }
}