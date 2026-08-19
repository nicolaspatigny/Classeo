package fr.eni.classeo.bll;

import fr.eni.classeo.bo.*;
import fr.eni.classeo.bo.pk.InscriptionPromotionPK;
import fr.eni.classeo.dal.PromotionRepository;
import fr.eni.classeo.dal.inscription.InscriptionPromotionRepository;
import fr.eni.classeo.dal.user.AuthRepository;
import fr.eni.classeo.dal.user.UtilisateurRepository;
import fr.eni.classeo.dto.Role;
import fr.eni.classeo.dto.UtilisateurDto;
import fr.eni.classeo.dto.UtilisateurPostDto;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@Service
public class UtilisateurServiceImpl implements UtilisateurService {

    private UtilisateurRepository utilisateurRepository;

    private InscriptionPromotionRepository inscriptionPromotionRepository;

    private AuthRepository  authRepository;

    private PromotionRepository promotionRepository;

    private PasswordEncoder passwordEncoder;

    @Override
    public List<UtilisateurDto> findAll() {

        return utilisateurRepository.findAllUtilisateurs()
                .stream()
                .map(result->{
                    Utilisateur utilisateur = (Utilisateur) result[0];
                    String authority = (String)result[1];

                    Role role = Role.fromAuthority(authority);

                    InscriptionPromotion inscription = inscriptionPromotionRepository
                            .findFirstByEleveIdOrderByDateInscriptionDesc(utilisateur.getId())
                            .orElse(null);

                    Integer promotionId = null;
                    Integer cursusId = null;
                    Integer filiereId = null;

                    if (inscription != null) {
                        Promotion promotion = inscription.getPromotion();

                        promotionId = promotion.getId();
                        cursusId = promotion.getCursus().getId();
                        filiereId = promotion.getCursus().getFiliere().getId();
                    }

                    return new UtilisateurDto(
                            utilisateur.getId(),
                            utilisateur.getNom(),
                            utilisateur.getPrenom(),
                            utilisateur.getDateNaissance(),
                            role,
                            filiereId,
                            cursusId,
                            promotionId
                    );
                }).toList();
    }

    @Override
    public UtilisateurDto getUserById(Integer id) {
        if (id == null || id <= 0) {
            throw new IllegalArgumentException("L'identifiant est invalide : " + id);
        }

        Utilisateur utilisateurBd = utilisateurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable : " + id));

        Auth auth = authRepository.findByUserId(utilisateurBd)
                .orElseThrow(() -> new RuntimeException("Authentification introuvable : " + id));

        return switch (auth.getAuthority()) {
            case "ROLE_ADMINISTRATEUR" -> UtilisateurDto.builder()
                    .id(utilisateurBd.getId())
                    .nom(utilisateurBd.getNom())
                    .prenom(utilisateurBd.getPrenom())
                    .dateNaissance(utilisateurBd.getDateNaissance())
                    .role(Role.ADMINISTRATEUR)
                    .build();

            case "ROLE_ENSEIGNANT" -> UtilisateurDto.builder()
                    .id(utilisateurBd.getId())
                    .nom(utilisateurBd.getNom())
                    .prenom(utilisateurBd.getPrenom())
                    .dateNaissance(utilisateurBd.getDateNaissance())
                    .role(Role.ENSEIGNANT)
                    .build();

            case "ROLE_ELEVE" -> {
                // Récupération de la dernière inscription (si elle existe)
                InscriptionPromotion inscription = inscriptionPromotionRepository
                        .findFirstByEleveIdOrderByDateInscriptionDesc(utilisateurBd.getId())
                        .orElse(null);

                Integer promotionId = null;
                Integer cursusId = null;
                Integer filiereId = null;

                // Extraire les IDs si l'inscription existe
                if (inscription != null && inscription.getPromotion() != null) {
                    Promotion promo = inscription.getPromotion();
                    promotionId = promo.getId();

                    if (promo.getCursus() != null) {
                        cursusId = promo.getCursus().getId();
                        if (promo.getCursus().getFiliere() != null) {
                            filiereId = promo.getCursus().getFiliere().getId();
                        }
                    }
                }
                // 'yield' obligatoire pour retourner la valeur depuis un bloc de switch { }
                yield UtilisateurDto.builder()
                        .id(utilisateurBd.getId())
                        .nom(utilisateurBd.getNom())
                        .prenom(utilisateurBd.getPrenom())
                        .dateNaissance(utilisateurBd.getDateNaissance())
                        .role(Role.ELEVE)
                        .filiereId(filiereId)
                        .cursusId(cursusId)
                        .promotionId(promotionId)
                        .build();
            }

            default -> throw new IllegalArgumentException("Rôle inconnu : " + auth.getAuthority());
        };
    }

    @Transactional
    @Override
    public void addUtilisateur(UtilisateurPostDto utilisateur) {
        if (utilisateur == null) {
            throw new IllegalArgumentException("L'utilisateur ne peut pas être nul");
        }

        // 1. Instanciation directe de la bonne classe fille selon le rôle
        Utilisateur userToSave;

        switch (utilisateur.getRole()) {
            case "ADMINISTRATEUR" -> userToSave = Utilisateur.builder()
                    .nom(utilisateur.getNom())
                    .prenom(utilisateur.getPrenom())
                    .dateNaissance(utilisateur.getDateNaissance())
                    .build();

            case "ENSEIGNANT" -> userToSave = Formateur.builder()
                    .nom(utilisateur.getNom())
                    .prenom(utilisateur.getPrenom())
                    .dateNaissance(utilisateur.getDateNaissance())
                    .build();

            case "ELEVE" -> userToSave = Eleve.builder()
                    .nom(utilisateur.getNom())
                    .prenom(utilisateur.getPrenom())
                    .dateNaissance(utilisateur.getDateNaissance())
                    .build();

            default -> throw new IllegalArgumentException("Rôle inconnu : " + utilisateur.getRole());
        }

        // 2. Un seul save ! Hibernate génère l'INSERT dans 'utilisateur' ET dans 'formateur'/'eleve'
        Utilisateur savedUser = utilisateurRepository.save(userToSave);

        // 3. Traitement spécifique pour l'Élève (inscription promotion)
        if (savedUser instanceof Eleve eleve && utilisateur.getPromotionId() != null) {
            Promotion promotion = promotionRepository.findById(utilisateur.getPromotionId())
                    .orElseThrow(() -> new IllegalArgumentException("Promotion non trouvée : " + utilisateur.getPromotionId()));

            InscriptionPromotion inscription = new InscriptionPromotion();
            InscriptionPromotionPK id = new InscriptionPromotionPK(eleve.getId(), promotion.getId());

            inscription.setId(id);
            inscription.setEleve(eleve);
            inscription.setPromotion(promotion);
            inscription.setDateInscription(LocalDate.now());

            inscriptionPromotionRepository.save(inscription);
        }

        // 4. Création du compte de connexion Auth
        Auth authToSave = new Auth();
        authToSave.setLogin(utilisateur.getLogin());
        authToSave.setPassword(passwordEncoder.encode(utilisateur.getPassword())); // À encoder si Spring Security est utilisé
        authToSave.setAuthority("ROLE_" + utilisateur.getRole());
        authToSave.setUserId(savedUser);

        authRepository.save(authToSave);

    }
}
