package fr.eni.classeo.controller;

import fr.eni.classeo.bll.UtilisateurService;

import fr.eni.classeo.dto.UtilisateurDto;
import fr.eni.classeo.dto.UtilisateurPostDto;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UtilisateurController {

    private UtilisateurService utilisateurService;

    @GetMapping
    public ResponseEntity<?> getUtilisateurs(){
        List<UtilisateurDto> utilisateurs = utilisateurService.findAll();
        return ResponseEntity.ok(utilisateurs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUtilisateurById(@PathVariable Integer id){
        return ResponseEntity.ok(utilisateurService.getUserById(id));
    }

    @PostMapping
    public ResponseEntity<?> addUtilisateur(
            @Valid @RequestBody UtilisateurPostDto utilisateur){

        utilisateurService.addUtilisateur(utilisateur);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUtilisateur(
            @PathVariable Integer id,
            @Valid @RequestBody UtilisateurPostDto utilisateur){

        utilisateurService.updateUtilisateur(id, utilisateur);

        return ResponseEntity.ok().build();
    }
}
