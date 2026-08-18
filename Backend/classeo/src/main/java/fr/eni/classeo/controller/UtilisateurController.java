package fr.eni.classeo.controller;

import fr.eni.classeo.bll.UtilisateurService;

import fr.eni.classeo.dto.UtilisateurDto;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UtilisateurController {

    private UtilisateurService utilisateurService;

    @GetMapping
    public ResponseEntity<?> getUtilisateurs(){
        List<UtilisateurDto> utilisateurs =  utilisateurService.findAll();
        return ResponseEntity.ok(utilisateurs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUtilisateurById(@PathVariable Integer id){
        return ResponseEntity.ok(utilisateurService.getUserById(id));
    }
}
