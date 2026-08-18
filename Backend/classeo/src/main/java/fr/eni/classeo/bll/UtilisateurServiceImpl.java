package fr.eni.classeo.bll;

import fr.eni.classeo.bo.InscriptionPromotion;
import fr.eni.classeo.bo.Promotion;
import fr.eni.classeo.bo.Utilisateur;
import fr.eni.classeo.dal.inscription.InscriptionPromotionRepository;
import fr.eni.classeo.dal.user.UtilisateurRepository;
import fr.eni.classeo.dto.Role;
import fr.eni.classeo.dto.UtilisateurDto;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class UtilisateurServiceImpl implements UtilisateurService {

    private UtilisateurRepository utilisateurRepository;

    private InscriptionPromotionRepository inscriptionPromotionRepository;

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
}
