package fr.eni.classeo.controller;

import fr.eni.classeo.bll.FiliereService;
import fr.eni.classeo.bo.Filiere;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/filieres")
public class FiliereController {

    private FiliereService filiereService;

    @GetMapping
    public ResponseEntity<?> listeFilieres(){
        final List<Filiere> filieres = filiereService.listeFilieres();
        if(filieres == null || filieres.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(filieres);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getFiliereById(@PathVariable Integer id) { // 3. Spring convertit directement en Integer
        try {
            Filiere filiere = filiereService.filiereById(id);
            if (filiere == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Filière introuvable");
            }
            return ResponseEntity.ok(filiere);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
